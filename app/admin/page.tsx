'use client'

import React, { useEffect, useState } from 'react' // Import useState
import { useOrganizationList, useSession } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import ServicesAdmin from '../components/ServicesAdmin'
import CarouselAdmin from '../components/CarouselAdmin'
import CalendarAdmin from '../components/CalendarAdmin'
import AboutAdmin from '../components/AboutAdmin'
import { PuffLoader } from 'react-spinners'

const Dashboard = () => {
	const router = useRouter() // Correctly get the router instance

	const { isLoaded, userMemberships } = useOrganizationList({
		userMemberships: true
	})
	const [isLoading, setIsLoading] = useState(true) // Control the loading state
	const { session } = useSession() // Correctly retrieve the session

	useEffect(() => {
		// Define the async function inside the useEffect
		const checkAdminStatus = async () => {
			if (session) {
				// Check if user is an admin. Adjust the logic based on your user session structure.
				const isAdmin = session.user.organizationMemberships.some(
					(membership) => membership.role === 'org:admin'
				)

				if (!isAdmin) {
					// If not admin, redirect to home
					router.push('/')
				} else {
					setIsLoading(false) // If admin, display the dashboard
				}
			} else {
				// If no session is found, redirect to home
				router.push('/')
			}
		}

		// Invoke the async function
		checkAdminStatus()
	}, [session, router])

	// Render loading state or the actual content
	if (!isLoaded) {
		return (
			<>
				<div className="flex justify-center items-center mt-96">
					<PuffLoader color="#36d7b7" />
				</div>
			</>
		)
	}

	const handleResetServiceForm = () => {
		// Logic to reset the form or clear state
		console.log('Resetting service form')
	}

	return (
		<div key="adminDashboard" className="min-h-screen bg-gray-100 p-2 md:p-8">
			<h1 className="text-4xl text-center font-bold md:font-semibold mb-5 md:mb-10 sm:text-5xl md:text-6xl text-gray-800">
				Admin Dashboard
			</h1>
			<div className="space-y-12">
				<CarouselAdmin />
				<CalendarAdmin />
				<AboutAdmin />
				<ServicesAdmin />
			</div>
		</div>
	)
}

export default Dashboard
