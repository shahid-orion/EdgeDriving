'use client'

import { Lesson, LessonStatus, ServicesAdminProps } from '@/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'

// Assuming the Lesson and LessonStatus types are imported or defined above
// const ServicesAdmin = ({ onSave, onReset }) => {
const ServicesAdmin = ({ onSave, onReset }: ServicesAdminProps) => {
	const [lesson, setLesson] = useState<Lesson>({
		name: '',
		description: '',
		date: '',
		time: '',
		status: 'pending'
	})

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target
		setLesson((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSave(lesson)
		// Reset lesson state
		setLesson({
			name: '',
			description: '',
			date: '',
			time: '',
			status: 'pending'
		})
	}

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 max-w-7xl mx-auto">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Service Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={lesson.name}
						onChange={handleChange}
						placeholder="Enter service name"
						className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						name="description"
						id="description"
						value={lesson.description}
						onChange={handleChange}
						rows={3}
						className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
						placeholder="Enter service description"
						required
					></textarea>
				</div>

				<div>
					<label
						htmlFor="date"
						className="block text-sm font-medium text-gray-700"
					>
						Date
					</label>
					<input
						type="date"
						name="date"
						id="date"
						value={lesson.date}
						onChange={handleChange}
						className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="time"
						className="block text-sm font-medium text-gray-700"
					>
						Time
					</label>
					<input
						type="time"
						name="time"
						id="time"
						value={lesson.time}
						onChange={handleChange}
						className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="status"
						className="block text-sm font-medium text-gray-700"
					>
						Status
					</label>
					<select
						name="status"
						id="status"
						value={lesson.status}
						onChange={handleChange}
						className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					>
						<option value="pending">Pending</option>
						<option value="approved">Approved</option>
						<option value="canceled">Canceled</option>
					</select>
				</div>

				<div className="flex justify-between">
					<button
						type="submit"
						className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
					>
						Save Service
					</button>
					<button
						type="button"
						onClick={onReset}
						className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
					>
						Reset Form
					</button>
				</div>
			</form>
		</div>
	)
}

export default ServicesAdmin
