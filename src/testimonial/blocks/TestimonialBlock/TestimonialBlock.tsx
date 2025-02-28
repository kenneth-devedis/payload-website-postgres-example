import { getAllTestimonials } from '@/testimonial/domain/getAllTestimonials'
import { TestimonialBlockProps } from '@/payload-types'
import { TestimonialSlider } from '@/testimonial/components/TestimonialSlider'
import { Suspense } from 'react'

export function TestimonialBlock(props: TestimonialBlockProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncTestimonialBlock {...props} />
    </Suspense>
  )
}

async function AsyncTestimonialBlock({ guidelines }: TestimonialBlockProps) {
  const testimonials = await getAllTestimonials()
  return <TestimonialSlider testimonials={testimonials} guidelines={guidelines ?? undefined} />
}
