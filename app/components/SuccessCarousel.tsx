'use client'

import React, { CSSProperties, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { CarouselItem } from '@/types'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { fetchCollectionData } from '@/utils/utils'

const SuccessCarousel = () => {
	const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([])

	// Fetch carousel data from Firestore
	useEffect(() => {
		// Listen for real-time updates with onSnapshot
		const unsubscribe = onSnapshot(
			collection(db, 'carouselItems'),
			async () => {
				const updatedItems = await fetchCollectionData<CarouselItem>(
					db,
					'carouselItems'
				)
				setCarouselItems(updatedItems)
			}
		)

		return () => unsubscribe() // Clean up the subscription
	}, [])
	// useEffect(() => {
	// 	const fetchCarouselData = async () => {
	// 		const querySnapshot = await getDocs(collection(db, 'carouselItems'))
	// 		const items: CarouselItem[] = []
	// 		querySnapshot.forEach((doc) => {
	// 			;``
	// 			items.push({
	// 				id: doc.id,
	// 				...doc.data()
	// 			} as CarouselItem)
	// 		})
	// 		setCarouselItems(items)
	// 	}

	// 	fetchCarouselData()
	// }, [])

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
			<div className="embla__container flex">
				{carouselItems.map((item, index) => (
					<div key={item.id} className="embla__slide relative w-full h-96">
						{/* Image container */}
						<div className="relative w-full h-full">
							<Image
								src={item.imageUrl || '/defaultImage.jpg'}
								alt={`Slide ${index + 1}`}
								fill
								style={{ objectFit: 'cover' }}
								priority
								sizes="(max-width: 768px) 100vw, 33vw"
							/>
							{/* Overlay to improve text visibility */}
							<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
						</div>

						{/* Caption with styling for readability */}
						<div className="absolute bottom-0 left-0 right-0 p-4">
							<p className="text-center text-white font-semibold bg-black bg-opacity-50 p-2 rounded">
								{item.caption}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default SuccessCarousel
