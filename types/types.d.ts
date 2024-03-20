// types.d.ts
import 'next-auth'
declare module 'next-auth' {
	/**
	 * Extends the built-in session.user type from next-auth.
	 */
	interface User {
		id: number
		role: 'admin' | 'user'
	}

	/**
	 * Extends the built-in session type from next-auth.
	 */
	interface Session {
		user: User
	}
	/**
	 * The shape of the JWT object.
	 */
	interface JWT {
		role?: 'admin' | 'user'
	}
}
export interface User {
	id: number
	name: string
	email: string
	role: 'admin' | 'user'
	password: string // Passwords should be hashed in a real application
}

export interface Session {
	user: {
		name: string
		email: string
		role: 'admin' | 'user'
	}
}

type Lesson = {
	id: number
	userId: number
	lessonId: number
	date: string
	time: string
	status: LessonStatus
	name: string // Add this line
	description: string // Add this line
}

type Instructor = {
	id: number
	name: string
	photo: string
	expertise: string
	experience: string
	description: string
}

interface CalendarEvent {
	id: string
	title: string
	start: string
	end: string
	color: string // Assuming you want to store a color for each event
}

interface NewBooking {
	date: string
	startTime: string
	endTime: string
}
