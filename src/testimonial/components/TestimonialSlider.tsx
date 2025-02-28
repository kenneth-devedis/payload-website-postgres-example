'use client'

import { Testimonial } from '@/payload-types'
import { TestimonialNavigation } from '@/testimonial/components/TestimonialNavigation'
import { useState } from 'react'
import { TestimonialSlide } from '@/testimonial/components/TestimonialSlide'

export type TestimonialSliderProps = {
  testimonials: Testimonial[]
  guidelines?: boolean
}

export function TestimonialSlider({ testimonials, guidelines }: TestimonialSliderProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial>()
  return (
    <div>
      <div className="relative">
        {guidelines && (
          <hr className="absolute left-1/2 top-0 w-screen -translate-x-1/2 border-t sm:border-conpat-gray" />
        )}
        <div className="-mx-4 bg-conpat-lightergray @container md:-mx-8">
          {currentTestimonial && <TestimonialSlide testimonial={currentTestimonial} />}
        </div>
        {guidelines && (
          <hr className="absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-t sm:border-conpat-gray" />
        )}
      </div>
      <TestimonialNavigation
        testimonialCount={testimonials.length}
        onShowTestimonial={(index) => setCurrentTestimonial(testimonials[index])}
      />
    </div>
  )
}
