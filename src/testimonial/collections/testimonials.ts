import { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { revalidateTag } from 'next/cache'
import { testimonialsCacheTag } from '@/testimonial/constants'

export const testimonials = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      label: 'Author',
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'text',
        },
        {
          name: 'photo',
          label: 'Photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'quote',
      label: 'Quote',
      type: 'textarea',
      required: true,
      maxLength: 160,
    },
  ],
  hooks: {
    afterChange: [() => revalidateTag(testimonialsCacheTag)],
    afterDelete: [() => revalidateTag(testimonialsCacheTag)],
  },
} as const satisfies CollectionConfig
