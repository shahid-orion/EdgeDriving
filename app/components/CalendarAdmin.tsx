'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import { CalendarEvent, SelectInfo } from '@/types' // Adjust this path as necessary
import { db } from '@/firebaseConfig'
import {
	addDoc,
	collection,
	doc,
	updateDoc,
	getDocs,
	deleteDoc
} from 'firebase/firestore'
import { fetchCollectionData } from '@/utils/utils'
import { format, parseISO } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'
import toast from 'react-hot-toast'

const CalendarAdmin = () => {
	const [events, setEvents] = useState<CalendarEvent[]>([])
	const [bookingDetails, setBookingDetails] = useState({
		id: '', // Track the event ID for editing
		title: '',
		date: '',
		startTime: '',
		endTime: ''
	})

	useEffect(() => {
		const loadEvents = async () => {
			const fetchedEvents = await fetchCollectionData<CalendarEvent>(
				db,
				'bookings'
			)
			setEvents(fetchedEvents)
		}

		loadEvents()
	}, [])
	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setBookingDetails((prev) => ({ ...prev, [name]: value }))
	}
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const toastId = toast.loading('Please Wait...')
		const { id, title, date, startTime, endTime } = bookingDetails
		const start = `${date}T${startTime}`
		const end = `${date}T${endTime}`
		const newEvent = { title, start, end, color: '#6ee7b7' }

		if (id) {
			// Update existing event
			await updateDoc(doc(db, 'bookings', id), newEvent)
		} else {
			// Add new event
			await addDoc(collection(db, 'bookings'), newEvent)
		}

		// Clear form and refresh events
		setBookingDetails({
			id: '',
			title: '',
			date: '',
			startTime: '',
			endTime: ''
		})
		const fetchedEvents = await fetchCollectionData<CalendarEvent>(
			db,
			'bookings'
		)

		//toast notification
		toast.success('Updated successfully!', {
			id: toastId
		})
		setEvents(fetchedEvents)
	}

	const timeZone = 'Australia/Sydney' // Adjust as needed
	const handleEdit = (id: string) => {
		const eventToEdit = events.find((event) => event.id === id)
		if (eventToEdit) {
			const zonedStart = utcToZonedTime(parseISO(eventToEdit.start!), timeZone)
			const zonedEnd = utcToZonedTime(parseISO(eventToEdit.end!), timeZone)

			setBookingDetails({
				id: eventToEdit.id!,
				title: eventToEdit.title!,
				date: format(zonedStart, 'yyyy-MM-dd'),
				startTime: format(zonedStart, 'HH:mm'),
				endTime: format(zonedEnd, 'HH:mm')
			})
		}
	}

	const handleDelete = async (id: string) => {
		const toastId = toast.loading('Please Wait...')
		await deleteDoc(doc(db, 'bookings', id))
		const fetchedEvents = await fetchCollectionData<CalendarEvent>(
			db,
			'bookings'
		)

		//toast notification
		toast.success('Deleted successfully!', {
			id: toastId
		})

		setEvents(fetchedEvents)
	}

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 max-w-7xl mx-auto">
			<h2 className="text-4xl font-semibold mb-5 text-center">
				Manage Booking
			</h2>
			{/* Booking Form */}
			<div className="mb-8 ">
				<form
					onSubmit={handleSubmit}
					className="space-y-6 p-6 rounded-lg shadow bg-[#00a9d4]"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium text-gray-700"
							>
								Event Title
							</label>
							<input
								id="title"
								type="text"
								value={bookingDetails.title}
								onChange={(e) =>
									setBookingDetails({
										...bookingDetails,
										title: e.target.value
									})
								}
								placeholder="Enter the title"
								className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="date"
								className="block text-sm font-medium text-gray-700"
							>
								Date
							</label>
							<input
								id="date"
								type="date"
								value={bookingDetails.date}
								onChange={(e) =>
									setBookingDetails({ ...bookingDetails, date: e.target.value })
								}
								className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="startTime"
								className="block text-sm font-medium text-gray-700"
							>
								Start Time
							</label>
							<input
								id="startTime"
								type="time"
								value={bookingDetails.startTime}
								onChange={(e) =>
									setBookingDetails({
										...bookingDetails,
										startTime: e.target.value
									})
								}
								className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="endTime"
								className="block text-sm font-medium text-gray-700"
							>
								End Time
							</label>
							<input
								id="endTime"
								type="time"
								value={bookingDetails.endTime}
								onChange={(e) =>
									setBookingDetails({
										...bookingDetails,
										endTime: e.target.value
									})
								}
								className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
								required
							/>
						</div>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                            text-sm font-medium rounded-md text-white bg-[#007592] hover:bg-[#002d39]"
						>
							Save Booking
						</button>
					</div>
				</form>
			</div>

			{/* List of events */}
			<ul className="space-y-4">
				{events.map((event) => {
					const zonedStart = utcToZonedTime(parseISO(event.start!), timeZone)
					const zonedEnd = utcToZonedTime(parseISO(event.end!), timeZone)
					return (
						<li
							key={event.id}
							className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
						>
							<div>
								<h3 className="font-bold">{event.title}</h3>
								<p>{`${format(zonedStart, 'dd/MM/yyyy ha')} - ${format(
									zonedEnd,
									'ha'
								)}`}</p>
							</div>
							<div className="flex flex-col md:flex-row items-end">
								<button
									onClick={() => handleEdit(event.id!)}
									className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded md:mr-2"
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(event.id!)}
									className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-1 md:mt-0"
								>
									Delete
								</button>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default CalendarAdmin
