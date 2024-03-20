'use client'

// app/admin/dashboard.tsx
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Dashboard = () => {
	const { data: session } = useSession()
	const router = useRouter()

	// State for storing mock data
	const [bookings, setBookings] = useState([])
	const [analytics, setAnalytics] = useState({
		totalUsers: 0,
		totalBookings: 0
	})

	// Redirect if not authenticated or not an admin
	useEffect(() => {
		if (!session || session.user.role !== 'admin') {
			router.push('/app/login/page')
		} else {
			// Load your bookings and analytics data here
			// For demonstration, we're using placeholders
			setBookings([
				// Placeholder bookings data
			])
			setAnalytics({
				totalUsers: 50, // Placeholder total users
				totalBookings: 120 // Placeholder total bookings
			})
		}
	}, [session, router])

	if (!session || session.user.role !== 'admin') {
		return <p>Loading...</p>
	}

	return (
		<div className="admin-dashboard">
			<h1>Admin Dashboard</h1>
			<div className="analytics">
				<p>Total Users: {analytics.totalUsers}</p>
				<p>Total Bookings: {analytics.totalBookings}</p>
				{/* Additional analytics here */}
			</div>
			<div className="bookings">
				<h2>Booking Requests</h2>
				{/* Map through bookings to list them */}
			</div>
			{/* More admin functionalities */}
		</div>
	)
}

export default Dashboard
