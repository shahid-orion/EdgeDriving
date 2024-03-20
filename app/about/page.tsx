'use client'

import { Instructor } from '@/types/types'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import instructorsData from '@/public/data/instructors.json'
import hero from '../../assets/AI-Images/hero-image.png'

const About = () => {
	const [instructors, setInstructors] = useState<Instructor[]>([])

	return (
		<div className="py-8 px-4">
			<h1 className="text-4xl text-center font-semibold mb-10 sm:text-5xl md:text-6xl text-gray-800">
				Meet Our Instructors
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{instructorsData.map((instructor) => (
					<div
						key={instructor.id}
						className="bg-white rounded-lg overflow-hidden shadow-lg"
					>
						<Image
							src={instructor.photo} // Ensure this path is correct relative to the `public` directory
							alt={instructor.name}
							layout="responsive"
							width={640} // Adjust based on your aspect ratio
							height={360} // Adjust based on your aspect ratio
						/>
						<div className="p-4">
							<h2 className="text-xl font-bold">{instructor.name}</h2>
							<p className="text-indigo-600">{instructor.expertise}</p>
							<p className="text-sm text-gray-600">
								Experience: {instructor.experience}
							</p>
							<p className="mt-2 text-gray-700">{instructor.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default About
