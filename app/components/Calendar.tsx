'use client'

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction' // Corrected import
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import lessonsData from '../../public/data/bookings.json'
import { CalendarEvent } from '@/types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { fetchCollectionData } from '@/utils/utils'

const Calendar = () => {
	const [events, setEvents] = useState<CalendarEvent[]>([])
	useEffect(() => {
		const fetchEvents = async () => {
			const fetchedEvents = await fetchCollectionData<CalendarEvent>(
				db,
				'bookings'
			)
			setEvents(fetchedEvents)
		}

		fetchEvents()
	}, [])
	// useEffect(() => {
	// 	const fetchEvents = async () => {
	// 		const querySnapshot = await getDocs(collection(db, 'bookings'))
	// 		const fetchedEvents = querySnapshot.docs.map((doc) => ({
	// 			...doc.data(),
	// 			id: doc.id,
	// 			start: doc.data().start,
	// 			end: doc.data().end,
	// 			title: doc.data().title,
	// 			color: doc.data().color // Assuming your Firestore documents have a 'color' field
	// 		})) as CalendarEvent[]
	// 		setEvents(fetchedEvents)
	// 	}

	// 	fetchEvents()
	// }, [])

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 max-w-7xl mx-auto">
			<h2 className="text-4xl text-center font-semibold mb-10 md:text-5xl text-gray-800">
				Booking Availabilities
			</h2>
			{/* Calendar */}
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				events={events}
				editable={false}
				selectable={true}
				selectMirror={true}
				dayMaxEvents={true}
				weekends={true}
				headerToolbar={{
					left: 'prev,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay' // Removed 'listWeek' and today button
				}}
				eventContent={({ event, view }) => (
					// Customize the appearance of events here
					<div className="bg-blue-500 text-white rounded-lg p-2 shadow">
						<strong>{event.title}</strong>
						<br />
						{event.start?.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}{' '}
						-
						{event.end?.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</div>
				)}
			/>

			{/* <FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				events={events}
				editable={false}
				selectable={true}
				selectMirror={true}
				dayMaxEvents={true}
				weekends={true}
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay listWeek',
					start: 'title', // You can adjust this part to better position the button
					end: 'today prev,next' // Adjusting the position of the today, prev, and next buttons
				}}
				eventContent={({ event, view }) => (
					// Customize the appearance of events here
					<div className="bg-blue-500 text-white rounded-lg p-2 shadow">
						<strong>{event.title}</strong>
						<br />
						{event.start?.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}{' '}
						-
						{event.end?.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</div>
				)}
			/> */}
		</div>
	)
}

export default Calendar
