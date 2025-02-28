import { Testimonial } from '@/payload-types'
import styles from '@/testimonial/blocks/TestimonialBlock/TestimonialBlock.module.css'
import { isRefObject } from '@/utilities/references'
import { ImageMedia } from '@/components/Media/ImageMedia'

export function TestimonialSlide({ testimonial }: { testimonial: Testimonial }) {
  const authorPhoto = testimonial.author.photo
  return (
    <div className="flex min-h-[28rem] flex-col justify-center gap-12 p-12 sm:min-h-[26rem] sm:p-24 lg:min-h-[24rem] lg:flex-row lg:items-center lg:justify-between">
      <p className={`text-lg md:text-xl lg:text-3xl ${styles.quoted}`}>{testimonial.quote}</p>
      <div className="flex items-center gap-6">
        {isRefObject(authorPhoto) && (
          <ImageMedia
            resource={authorPhoto}
            imgClassName="h-16 w-16 min-w-16 rounded-full object-cover"
          />
        )}
        <span className="text-nowrap text-base md:text-lg lg:text-3xl">
          <span>{testimonial.author.name}</span>
          <br />
          <span>{testimonial.author.description}</span>
        </span>
      </div>
    </div>
  )
}
