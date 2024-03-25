export type Lesson = {
	id?: number
	userId?: number
	lessonId?: number
	date?: string
	time?: string
	status?: LessonStatus
	name?: string
	description?: string
}

export type Instructor = {
	id?: number
	name?: string
	photoUrl?: string // URL to the photo in Firebase Storage
	photo?: string
	expertise?: string
	experience?: string
	description?: string
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
