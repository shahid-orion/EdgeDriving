import { NextResponse } from 'next/server'
import bookings from '../../../public/data/bookings.json'

export async function GET(request: Request) {
	try {
		// const res = await fetch('/edge/public/data/bookings.json')
		// const data = await res.json()
		console.log(bookings)
		return NextResponse.json(bookings)
	} catch (error: any) {
		return NextResponse.json(error)
	}
	//return NextResponse.json({ msg: 'Hello from server' })
}
