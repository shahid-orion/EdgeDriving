'use client'
import { CalendarEvent, NewBooking } from '@/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Calendar from '../components/Calendar'

const BookingForm = () => {
	const [newBooking, setNewBooking] = useState<NewBooking>({
		date: '',
		startTime: '',
		endTime: ''
	})
	const [events, setEvents] = useState<CalendarEvent[]>([])

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setNewBooking((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const newEvent = {
			id: String(events.length + 1),
			title: 'New Booking',
			start: `${newBooking.date}T${newBooking.startTime}`,
			end: `${newBooking.date}T${newBooking.endTime}`,
			color: 'yellow'
		}

		// Update the events state to include the new booking
		setEvents((prev) => [...prev, newEvent])

		// Reset the form
		setNewBooking({ date: '', startTime: '', endTime: '' })
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="bg-[#002730] p-4 rounded-lg shadow-md flex flex-col gap-4 sm:flex-row sm:items-center"
		>
			<div className="flex flex-col sm:w-1/3">
				<label
					htmlFor="date"
					className="text-white font-semibold text-sm sm:text-base"
				>
					Date
				</label>
				<input
					id="date"
					type="date"
					name="date"
					value={newBooking.date}
					onChange={handleInputChange}
					required
					placeholder="Select Date"
					className="form-input rounded-md bg-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				/>
			</div>

			<div className="flex flex-col sm:w-1/3">
				<label
					htmlFor="startTime"
					className="text-white font-semibold text-sm sm:text-base"
				>
					Start Time
				</label>
				<input
					id="startTime"
					type="time"
					name="startTime"
					value={newBooking.startTime}
					onChange={handleInputChange}
					required
					placeholder="Start Time"
					className="form-input rounded-md bg-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				/>
			</div>

			<div className="flex flex-col sm:w-1/3">
				<label
					htmlFor="endTime"
					className="text-white font-semibold text-sm sm:text-base"
				>
					End Time
				</label>
				<input
					id="endTime"
					type="time"
					name="endTime"
					value={newBooking.endTime}
					onChange={handleInputChange}
					required
					placeholder="End Time"
					className="form-input rounded-md bg-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				/>
			</div>

			<button
				type="submit"
				className="w-full sm:w-auto py-2 px-4 bg-[#007592] text-white font-bold rounded hover:bg-[#00627a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Book Now
			</button>
		</form>
	)
}

export default BookingForm
