'use client'

import React, { useEffect, useState } from 'react' // Import useState
import { useOrganizationList } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { checkUserRole } from '@/utils/userUtils'
import ServicesAdmin from '../components/ServicesAdmin'
import InstructorAdmin from '../components/InstructorAdmin'
import { Lesson } from '@/types'
import CarouselAdmin from '../components/CarouselAdmin'
import CalendarAdmin from '../components/CalendarAdmin'

const Dashboard = () => {
	const router = useRouter() // Correctly get the router instance
	const [showLoader, setShowLoader] = useState(true) // Define a state for managing loader visibility

	const { isLoaded, userMemberships } = useOrganizationList({
		userMemberships: true
	})

	useEffect(() => {
		if (isLoaded && userMemberships.data && userMemberships.data.length > 0) {
			const adminOrganizationRole = userMemberships.data[0].role

			// Assuming you're looking to find if any of the roles is 'org:admin'
			const isAdmin = userMemberships.data.some(
				(mem) => mem.role === 'org:admin'
			)

			if (!isAdmin) {
				router.push('/') // Redirect if not admin
			} else {
				setShowLoader(false)
				router.push('/admin') // Directly go to admin page if admin
			}
		}
	}, [isLoaded, router])

	// Render loading state or the actual content
	if (!isLoaded) {
		return <>Loading</>
	}

	const handleSaveService = (lesson: Lesson) => {
		// Logic to save the lesson data to your backend or state
		console.log('Saving service', lesson)
	}

	const handleResetServiceForm = () => {
		// Logic to reset the form or clear state
		console.log('Resetting service form')
	}

	return (
		<div key="adminDashboard" className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
			<div className="space-y-12">
				<CarouselAdmin />
				<ServicesAdmin
					onSave={handleSaveService}
					onReset={handleResetServiceForm}
				/>
				{/* <InstructorAdmin /> */}
				<CalendarAdmin />
			</div>
		</div>
	)
}

export default Dashboard
