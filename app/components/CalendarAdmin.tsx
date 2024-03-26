'use client'

// Import necessary libraries and components
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { CalendarEvent } from '@/types' // Adjust this path as necessary

const CalendarAdmin = () => {
	const [events, setEvents] = useState<CalendarEvent[]>([])
	const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

	useEffect(() => {
		// Mock data loading from lessonsData or a backend
		const calendarEvents: CalendarEvent[] = [
			// Example events
			{
				id: '1',
				title: 'Lesson with John',
				start: '2023-09-01',
				end: '2023-09-01',
				color: '#6ee7b7'
			},
			{
				id: '2',
				title: 'Lesson with Jane',
				start: '2023-09-02',
				end: '2023-09-02',
				color: '#ff9f89'
			}
		]
		setEvents(calendarEvents)
	}, [])

	// Open a simple prompt to create a new event
	const handleDateSelect = (selectInfo: any) => {
		let title = prompt('Please enter a new title for your event')
		let calendarApi = selectInfo.view.calendar

		calendarApi.unselect() // Clear date selection

		if (title) {
			calendarApi.addEvent({
				id: createEventId(),
				title,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay
			})
		}
	}

	// A simple function to generate unique IDs for new events
	const createEventId = () => {
		return String(events.length + 1)
	}

	// Function to handle event click - opens a prompt for simple editing
	const handleEventClick = (clickInfo: any) => {
		let newTitle = prompt('Enter new title', clickInfo.event.title)

		if (newTitle) {
			clickInfo.event.setProp('title', newTitle)
		}
	}

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 max-w-7xl mx-auto">
			<h2 className="text-4xl font-semibold mb-5">Calendar Management</h2>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				events={events}
				select={handleDateSelect}
				eventClick={handleEventClick}
				editable={true}
				selectable={true}
				selectMirror={true}
				dayMaxEvents={true}
				weekends={true}
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay listWeek'
				}}
			/>
		</div>
	)
}

export default CalendarAdmin
