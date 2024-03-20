import { NextRequest, NextResponse } from 'next/server'
import bookingData from '@/app/data/bookings.json'
import { NextApiRequest } from 'next'
import axios from 'axios'

export async function GET(request: NextApiRequest) {
	try {
		const res = await fetch('/edge/public/data/bookings.json')
		const data = await res.json()
		console.log(res)
		return NextResponse.json(res)
	} catch (error: any) {
		return NextResponse.json(error)
	}
}
