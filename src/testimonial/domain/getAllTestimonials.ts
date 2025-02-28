import { unstable_cache } from 'next/cache'
import { testimonialsCacheTag } from '@/testimonial/constants'
import { getPayload } from 'payload'
import config from '@payload-config'

const getAllTestimonialsCached = unstable_cache(getAllTestimonialsUncached, [], {
  tags: [testimonialsCacheTag],
})

async function getAllTestimonialsUncached() {
  const payload = await getPayload({ config })
  return (
    await payload.find({
      collection: 'testimonials',
      pagination: false,
      depth: 1,
    })
  ).docs
}

export { getAllTestimonialsCached as getAllTestimonials }
