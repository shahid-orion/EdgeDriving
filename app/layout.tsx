import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
	title: 'Edge Driving Instruction',
	description: 'Generated by create next app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className="flex flex-col min-h-screen">
					<Toaster />
					<Navbar />
					<main className="flex-grow md:pt-20">{children}</main>
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	)
}
