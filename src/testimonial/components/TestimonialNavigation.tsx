'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export type TestimonialNavigationProps = {
  testimonialCount: number
  onShowTestimonial?: (index: number) => void
}

const autoScrollTimeInMs = 15000

export function TestimonialNavigation({
  testimonialCount,
  onShowTestimonial,
}: TestimonialNavigationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const nextIndex = () => setCurrentIndex((index) => (index + 1) % testimonialCount)
  const previousIndex = () =>
    setCurrentIndex((index) => (index - 1 + testimonialCount) % testimonialCount)
  useEffect(() => {
    const timeout = setTimeout(nextIndex, autoScrollTimeInMs)
    return () => clearTimeout(timeout)
  }, [currentIndex])
  useEffect(() => {
    if (onShowTestimonial) onShowTestimonial(currentIndex)
  }, [currentIndex, onShowTestimonial])

  return (
    <div className="-mx-4 flex justify-between md:-mx-8">
      <Button  onClick={previousIndex}>
        <ChevronLeft size={48} />
      </Button>
      <Button  onClick={nextIndex}>
        <ChevronRight size={48} />
      </Button>
    </div>
  )
}
