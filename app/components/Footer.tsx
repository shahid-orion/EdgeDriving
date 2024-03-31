import Link from 'next/link'
import React from 'react'

const Footer = () => {
	return (
		<footer className="w-full bg-[#002d39] text-white mt-auto">
			<div className="max-w-6xl mx-auto py-4 px-5 flex flex-col sm:flex-row justify-between items-center">
				<div className="text-center">
					<p>
						© {new Date().getFullYear()} Edge Driving Instruction. All rights
						reserved.
					</p>
				</div>
				<div>
					<p>Powered By Rupantor</p>
				</div>
				<div className="flex items-center space-x-4 md:space-x-12">
					<Link
						href="#"
						className="hover:text-blue-300 transition-colors duration-300"
					>
						Privacy Policy
					</Link>
					<Link
						href="#"
						className="hover:text-blue-300 transition-colors duration-300"
					>
						Terms of Service
					</Link>
					<Link
						href="/contact"
						className="hover:text-blue-300 transition-colors duration-300"
					>
						Contact Us
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
