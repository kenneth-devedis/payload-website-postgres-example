import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { testimonials } from '@/payload-generated-schema'

export async function GET({ headers }: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  await payload.db.drizzle.insert(testimonials).values({
    quote: 'Hello, World!',
    author_name: 'author name',
    author_photo: '01954cb2-1435-7c99-8701-b854cddbc8e1',
    author_description: 'author description'
  }).execute()
  const { user } = await payload.auth({ headers })
  return NextResponse.json(user, { status: 200 })
}
