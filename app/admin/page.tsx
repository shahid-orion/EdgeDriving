'use client'

import React, { useEffect, useState } from 'react' // Import useState
import { useOrganizationList } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { checkUserRole } from '@/utils/userUtils'

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
	}, [isLoaded, userMemberships, router])

	// Render loading state or the actual content
	if (!isLoaded) {
		return <>Loading</>
	}

	return (
		<>
			<ul>
				{userMemberships.data?.map((mem) => (
					<li key={mem.id}>
						<span>{mem.organization.name}</span>
					</li>
				))}
			</ul>
		</>
	)
}

export default Dashboard
