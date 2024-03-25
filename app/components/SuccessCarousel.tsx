'use client'

// components/SuccessCarousel.tsx
import React, { CSSProperties, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import success1 from '@/public/assets/success/success-1.jpg'
import success2 from '@/public/assets/success/success-2.jpg'
import success3 from '@/public/assets/success/success-3.jpg'
import success4 from '@/public/assets/success/success-4.jpg'

const carouselItems = [
	{
		id: 1,
		imageUrl: success1,
		caption: 'Our successful student 1'
	},
	{
		id: 2,
		imageUrl: success2,
		caption: 'Our successful student 2'
	},
	{
		id: 3,
		imageUrl: success3,
		caption: 'Our successful student 3'
	},
	{
		id: 4,
		imageUrl: success4,
		caption: 'Our successful student 4'
	}
]

const SuccessCarousel = () => {
	//   const [emblaRef] = useEmblaCarousel({ loop: true });

	const [emblaRef] = useEmblaCarousel({ loop: true }, [
		Autoplay({ delay: 5000 })
	])
	// Correctly typed inline style for the slide
	const slideStyle: CSSProperties = {
		position: 'relative',
		height: '100%' // Example property, adjust as needed
	}

	return (
		<div className="embla" ref={emblaRef}>
			<div className="embla__container">
				{carouselItems.map((item, index) => (
					<div className="embla__slide" key={item.id} style={slideStyle}>
						<div className="w-full h-96 relative flex items-end">
							<div className="slideOverlay"></div>
							<Image
								src={item.imageUrl}
								alt={`Slide ${index + 1}`}
								layout="fill"
								objectFit="cover" // Changed from contain to cover
								className="object-center" // This centers the image, useful if the image gets cropped
							/>
							<div className="absolute bottom-0 left-0 right-0 flex justify-center items-center w-80 mx-auto">
								<p className="legend w-1/2 bg-opacity-50 bg-black p-2 text-white text-center mx-auto">
									{item.caption}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default SuccessCarousel
