'use client'

import React, { useState, useEffect } from 'react'
import { db } from '@/firebaseConfig' // Adjust the path as needed
import { fetchCollectionData } from '@/utils/utils' // Adjust the path as needed
import { Instructor, FirestoreDocument } from '@/types'
import Image from 'next/image'

const About = () => {
	const [instructors, setInstructors] = useState<Instructor[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedInstructors: FirestoreDocument<Instructor>[] =
					await fetchCollectionData<Instructor>(db, 'instructors')
				setInstructors(fetchedInstructors)
			} catch (error) {
				console.error('Failed to fetch instructors:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 mx-auto">
			<h1 className="text-4xl text-center font-semibold mb-10 sm:text-5xl md:text-6xl text-gray-800">
				Meet Your Instructors
			</h1>
			{/* Centering container */}
			<div className="flex justify-center">
				<div
					className={`grid ${
						instructors.length === 1
							? 'grid-cols-1 justify-center'
							: instructors.length === 2
							? 'grid-cols-1 md:grid-cols-2 justify-center'
							: 'grid-cols-1 md:grid-cols-3'
					} gap-6 mx-auto`}
				>
					{instructors.map((instructor) => (
						<div
							key={instructor.id}
							className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md flex flex-col justify-between" // Use max-w-sm or a similar class to control the card size
						>
							<Image
								src={instructor.photoUrl!}
								alt={instructor.name!}
								layout="responsive"
								width={640}
								height={360}
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
		</div>
	)
}

export default About
