'use client'

// components/SuccessCarousel.tsx
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // Requires a loader
import success1 from '@/public/assets/success/success-1.jpg'
import success3 from '@/public/assets/success/success-3.jpg'
import success2 from '@/public/assets/success/success-2.jpg'
import success4 from '@/public/assets/success/success-4.jpg'
import Image from 'next/image'

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
		id: 2,
		imageUrl: success3,
		caption: 'Our successful student 3'
	},
	{
		id: 2,
		imageUrl: success4,
		caption: 'Our successful student 4'
	}
	// Add more slides as needed
]

const SuccessCarousel = () => {
	return (
		<Carousel
			showArrows={true}
			infiniteLoop={true}
			showThumbs={false}
			showStatus={false}
			autoPlay={true}
			interval={5000}
			className="carousel"
			renderThumbs={() => []}
		>
			{carouselItems.map((item) => (
				<div key={item.id} className="relative h-96 w-full flex items-end">
					<div className="w-full h-full relative">
						{/* <div
						className="relative w-full h-full  md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 
                    overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 
                    shadow-lg bg-[#abc9fa] md:bg-white"
					> */}
						<Image
							src={item.imageUrl}
							alt={item.caption}
							layout="fill"
							objectFit="contain"
							className="object-center"
						/>
					</div>
					{/* Adjusted Flex container for caption to center it horizontally and take up half the width */}
					<div className="absolute bottom-0 left-0 right-0 flex justify-center items-center w-80 mx-auto">
						<p className="legend w-1/2 bg-opacity-50 bg-black p-2 text-white text-center mx-auto">
							{item.caption}
						</p>
					</div>
				</div>
			))}
		</Carousel>
		// <Carousel
		// 	showArrows={true}
		// 	infiniteLoop={true}
		// 	showThumbs={false}
		// 	showStatus={false}
		// 	autoPlay={true}
		// 	interval={5000}
		// 	className="carousel"
		// 	renderThumbs={() => []}
		// >
		// 	{carouselItems.map((item) => (
		// 		<div
		// 			key={item.id}
		// 			className="relative h-64 md:h-96 w-full flex justify-center items-center"
		// 		>
		// 			{/* Card container with gradient background */}
		// 			<div className="relative w-full h-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
		// 				<Image
		// 					src={item.imageUrl}
		// 					alt={item.caption}
		// 					layout="fill"
		// 					objectFit="cover" // or "contain" based on your preference
		// 					className="object-center"
		// 				/>
		// 			</div>
		// 			<p className="absolute bottom-0 w-1/2 bg-black bg-opacity-20 p-2 text-white text-center mx-auto rounded">
		// 				{item.caption}
		// 			</p>
		// 		</div>
		// 	))}
		// </Carousel>
	)
}

export default SuccessCarousel
