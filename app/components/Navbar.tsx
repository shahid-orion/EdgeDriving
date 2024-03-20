'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/assets/logo.png'

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

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
							<Link href="/" className="py-4 px-2 text-white font-semibold">
								Home
							</Link>
							<Link
								href="/about"
								className="py-4 px-2 text-white font-semibold"
							>
								About
							</Link>
							<Link
								href="/services"
								className="py-4 px-2 text-white font-semibold"
							>
								Services
							</Link>
							<Link
								href="/booking"
								className="py-4 px-2 text-white font-semibold"
							>
								Booking
							</Link>
							<Link
								href="/contact"
								className="py-4 px-2 text-white font-semibold"
							>
								Contact
							</Link>
							<Link
								href="/login"
								className="py-4 px-2 text-white font-semibold"
							>
								Login
							</Link>
						</div>
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
							href="/login"
							className="block text-sm px-2 py-4 text-white hover:bg-blue-700 transition duration-300"
						>
							Login
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
