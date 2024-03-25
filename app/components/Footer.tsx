import React from 'react'

const Footer = () => {
	return (
		<footer className="w-full bg-[#002d39] text-white mt-auto">
			<div className="max-w-6xl mx-auto py-4 px-5 flex flex-col sm:flex-row justify-between items-center">
				<div>
					<p>
						© {new Date().getFullYear()} Edge Driving Instruction. All rights
						reserved.
					</p>
				</div>
				<div className="flex items-center space-x-4">
					<a
						href="#"
						className="hover:text-blue-300 transition-colors duration-300"
					>
						Privacy Policy
					</a>
					<a
						href="#"
						className="hover:text-blue-300 transition-colors duration-300"
					>
						Terms of Service
					</a>
					<a
						href="#"
						className="hover:text-blue-300 transition-colors duration-300"
					>
						Contact Us
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
