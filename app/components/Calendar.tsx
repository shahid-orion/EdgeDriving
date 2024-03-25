'use client'

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction' // Corrected import
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import lessonsData from '../../public/data/bookings.json'
import { CalendarEvent } from '@/types'

const Calendar = () => {
	const [events, setEvents] = useState<CalendarEvent[]>([])

	useEffect(() => {
		const calendarEvents = lessonsData.map((lesson) => ({
			id: lesson.id.toString(),
			title: `${lesson.instructor} (${lesson.booked ? 'Booked' : 'Available'})`,
			start: `${lesson.date}T${lesson.startTime}`,
			end: `${lesson.date}T${lesson.endTime}`,
			color: lesson.booked ? '#ff9f89' : '#6ee7b7' // Different colors for booked vs. available
		}))

		setEvents(calendarEvents)
	}, [])

	return (
		<div className="p-4">
			<h2 className="text-4xl text-center font-semibold mb-10 md:text-5xl text-gray-800">
				Book Your Lesson
			</h2>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				events={events}
				nowIndicator
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				}}
				eventClick={(clickInfo) => {
					alert(
						`${clickInfo.event.title}\n\nStart: ${clickInfo.event.startStr}\nEnd: ${clickInfo.event.endStr}`
					)
					// Implement further functionalities as needed, e.g., opening a booking modal
				}}
				selectable={true}
				select={(selectionInfo) => {
					console.log(selectionInfo)
					// Placeholder for functionality to add new bookings
				}}
			/>
		</div>
	)
}

export default Calendar
