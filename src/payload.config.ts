// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { testimonials } from '@/testimonial/collections'
import { varchar } from '@payloadcms/db-postgres/drizzle/pg-core'
import { sql } from '@payloadcms/db-postgres/drizzle'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log('DATABASE_URL', process.env.DATABASE_URL)
console.log('DATABASE_URI', process.env.DATABASE_URI)
export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    idType: 'uuid',
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    beforeSchemaInit: [
      ({schema, adapter}) => {
        const mediaTable = adapter.rawTables.media
        if (!mediaTable) return schema
        mediaTable.columns.prefix = {
          name: 'prefix',
          type: 'varchar',
        }
        const allTables = Object.values(adapter.rawTables)
        allTables.forEach(table => {
          const idColumn = table.columns.id
          if (!idColumn || idColumn.type !== 'uuid') return
          table.columns.id = {
            ...idColumn,
            default: sql`uuid_generate_v7()`
          }
        })
        return schema
      }
    ],
    /*afterSchemaInit: [
      ({ schema, extendTable }) => {
        extendTable({
          table: schema.tables.media,
          columns: {
            prefix: varchar('prefix'),
          }
        })
        return schema
      }
    ]*/
  }),
  collections: [Pages, Posts, Media, Categories, Users, testimonials],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        [Media.slug]: {
          prefix: 'media-postgres-',
        },
      },
      cacheControlMaxAge: 60 * 60 * 24 * 365,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
