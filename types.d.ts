export type CarouselItem = {
	id?: tring
	imageUrl?: string
	caption?: string
	file?: File
}

export type Service = {
	id?: string
	name?: string
	description?: string
	service?: ServiceType
	price?: number
}

export type ServiceType =
	| 'GENERAL'
	| 'INTENSIVE'
	| 'PACKAGE'
	| 'CAR HIRE FOR DRIVING TEST'

// Define a Props interface for the component
interface ServicesAdminProps {
	onSave: (lesson: Lesson) => void
	onReset: () => void
	onDelete?: (id: number) => void // Optional prop
}

export type Instructor = {
	id?: string
	name?: string
	photoUrl?: string // URL to the photo in Firebase Storage
	expertise?: string
	experience?: string
	description?: string
	file?: File // Optional file field for image uploads
}

export interface CalendarEvent {
	id?: string
	title?: string
	start?: string
	end?: string
	color?: string // store a color for each event
}

export interface NewBooking {
	date?: string
	startTime?: string
	endTime?: string
}

export interface OrganizationMembership {
	role?: string
}

export interface User {
	organizationMemberships: OrganizationMembership[]
}

export interface Session {
	user?: User // user is optional to handle cases where session might not have a user
}

// Generic type for Firestore document
export type FirestoreDocument<T> = T & {
	id: string
}

interface SelectInfo {
	startStr: string
	endStr: string
	event?: {
		title: string
	}
	// Add more properties as needed based on FullCalendar documentation
}
