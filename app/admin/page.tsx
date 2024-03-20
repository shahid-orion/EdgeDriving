'use client'

// app/admin/page.tsx
// app/admin/page.tsx
import { getSession, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Session } from '@/types/types'
// If using getServerSideProps
import { GetServerSideProps } from 'next'

// Define a type for your component's props
type AdminPageProps = {
	sessionProp: Session // Assuming `sessionProp` is supposed to be a session object from NextAuth.js
}

export default function AdminPage({ sessionProp }: AdminPageProps) {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'loading') return // Wait until loading is done.
		if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
			router.push('/app/login/page') // Adjust as needed.
		}
	}, [session, status, router])

	if (status === 'loading') {
		return <p>Loading...</p>
	}

	return (
		<div>
			<h1>Admin Dashboard</h1>
			{/* Admin dashboard content */}
		</div>
	)
}
