import { Block } from 'payload'

export const testimonialBlockConfig: Block = {
  slug: 'testimonialBlock',
  interfaceName: 'TestimonialBlockProps',
  fields: [
    {
      name: 'guidelines',
      type: 'checkbox',
    },
  ],
}
