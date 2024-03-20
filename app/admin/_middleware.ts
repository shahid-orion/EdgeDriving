// app/admin/_middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Assuming you have a way to verify the user's role on the server-side
	// This could be a token in the cookies that you verify
	// For demonstration, this is a placeholder condition
	const isAdmin = true // Replace this with actual logic to verify if the user is an admin

	if (!isAdmin && pathname.startsWith('/app/admin')) {
		return NextResponse.redirect(new URL('/app/login/page', request.url))
	}

	return NextResponse.next()
}
