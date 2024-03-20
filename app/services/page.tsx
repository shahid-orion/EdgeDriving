'use client'

import { useState } from 'react'
import lessonsData from '@/public/data/services.json' // Ensure the path is correct
import { Lesson } from '@/types/types'

// Add this type definition at the top of your component or in a types file
type LessonStatus = 'pending' | 'approved' | 'canceled'

export default function Booking() {
	const [lessons, setLessons] = useState<Lesson[]>(lessonsData as Lesson[])

	// Function to return status badge styles based on lesson status
	const statusStyles = (status: LessonStatus) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-400 text-white'
			case 'approved':
				return 'bg-green-500 text-white'
			case 'canceled':
				return 'bg-red-500 text-white'
			default:
				return 'bg-gray-200 text-black'
		}
	}

	return (
		<div className="p-4">
			<h2 className="text-4xl text-center font-semibold mb-10 sm:text-5xl md:text-6xl text-gray-800">
				Current Services
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{lessons.map((lesson) => (
					<div
						key={lesson.id}
						className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#b6f2fe]"
					>
						<h3 className="text-xl font-semibold">{lesson.name}</h3>
						<p>{lesson.description}</p>
						<p className="mt-2">
							<strong>Date:</strong> {lesson.date} <strong>Time:</strong>{' '}
							{lesson.time}
						</p>
						{/* Status Badge */}
						<span
							className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-4 ${statusStyles(
								lesson.status
							)}`}
						>
							{lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
