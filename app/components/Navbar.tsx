'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
import {
	UserButton,
	useUser,
	useSession,
	SignedOut,
	SignInButton,
	SignedIn
} from '@clerk/nextjs'
import { checkUserRole } from '@/utils/userUtils'
import { useOrganizationList } from '@clerk/nextjs'

const links = [
	{ title: 'Home', url: '/' },
	{ title: 'About', url: '/about' },
	{ title: 'Services', url: '/services' },
	{ title: 'Booking', url: '/booking' },
	{ title: 'Contact', url: '/contact' },
	{ title: 'Admin', url: '/admin', role: 'admin' }
]

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const { session } = useSession()
	const userRole = checkUserRole(session!)

	return (
		<nav className="bg-[#007592] shadow-lg">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div className="">
							{/* Website Logo */}
							<Link href="/" className="flex items-center py-4 px-2">
								<Image
									src={logo}
									alt="Logo"
									className="h-8 w-20 md:h-12 md:w-32 lg:h-16 lg:w-48 mr-4 rounded"
									width={100}
									height={100}
								/>
							</Link>
						</div>
						{/* Primary Navbar items */}
						<div
							className={`hidden md:flex items-center space-x-1 ${
								isMenuOpen ? 'flex' : 'hidden'
							}`}
						>
							{links.map((link) =>
								(link.role === 'admin' && userRole === 'org:admin') ||
								!link.role ? (
									<Link
										key={link.title}
										href={link.url}
										className="py-4 px-2 text-white font-semibold"
									>
										{/* Use a div instead of an anchor tag */}
										<div className="mr-5 cursor-pointer hover:text-[#002d39]">
											{link.title}
										</div>
									</Link>
								) : null
							)}

							<Link
								href="/"
								className="block text-lg px-2 py-4 text-white font-semibold transition duration-300"
							>
								<UserButton afterSignOutUrl="/" />

								<SignedOut>
									<SignInButton afterSignInUrl="/admin" mode="modal" />
								</SignedOut>
							</Link>
						</div>
						<div></div>
					</div>
					{/* Hamburger menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="outline-none mobile-menu-button"
						>
							<svg
								className="w-6 h-6 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			{/* Mobile menu */}
			<div className={`${isMenuOpen ? 'block' : 'hidden'} mobile-menu`}>
				<ul className="">
					<li>
						<Link
							href="/"
							className="block text-sm px-2 py-4 text-white bg-blue-500 font-semibold"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							href="/about"
							className="block text-sm px-2 py-4 text-white hover:bg-blue-700 transition duration-300"
						>
							About
						</Link>
					</li>
					<li>
						<Link
							href="/services"
							className="block text-sm px-2 py-4 text-white hover:bg-blue-700 transition duration-300"
						>
							Services
						</Link>
					</li>
					<li>
						<Link
							href="/booking"
							className="block text-sm px-2 py-4 text-white hover:bg-blue-700 transition duration-300"
						>
							Booking
						</Link>
					</li>
					<li>
						<Link
							href="/contact"
							className="block text-sm px-2 py-4 text-white hover:bg-blue-700 transition duration-300"
						>
							Contact
						</Link>
					</li>
					<li>
						<Link
							href="/admin"
							className="block text-sm px-2 py-4 text-white hover:bg-blue-700 transition duration-300"
						>
							Admin
						</Link>
					</li>
					<li className="block text-sm px-2 py-4 text-white hover:bg-blue-700 transition duration-300">
						<UserButton afterSignOutUrl="/" />

						<SignedOut>
							<SignInButton afterSignInUrl="/admin" mode="modal" />
						</SignedOut>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
