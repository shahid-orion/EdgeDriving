'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'

const ContactPage = () => {
	const [email, setEmail] = useState({
		name: '',
		email: '',
		message: ''
	})

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setEmail({ ...email, [name]: value })
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Here you would handle form submission, like sending an email or posting to an API.
	}

	return (
		<div className="container mx-auto p-6">
			<div className="text-center">
				<h1 className="text-4xl text-center font-semibold mb-10 sm:text-5xl md:text-6xl text-gray-800">
					Contact Us
				</h1>
				<p className="mb-4 text-2xl text-gray-600">
					Have questions? We would love to hear from you.
				</p>
			</div>

			<div className="bg-gradient-to-b from-[#00a9d4] to-[#06cdff] p-8 rounded-lg shadow-xl text-white flex flex-col md:flex-row justify-around items-center gap-8">
				{/* Contact Info Section */}
				<div>
					<h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
					<div className="flex items-center mb-3">
						<MapPinIcon className="h-6 w-6 mr-2" />
						<p>67 Warialda Street, Kogarah, NSW 2217</p>
					</div>
					<div className="flex items-center mb-3">
						<EnvelopeIcon className="h-6 w-6 mr-2" />
						<a href="mailto:eedgedriving@gmail.com">eedgedriving@gmail.com</a>
					</div>
					<div className="flex items-center">
						<PhoneIcon className="h-6 w-6 mr-2" />
						<a href="tel:0469046923">0469046923</a>
					</div>
				</div>

				{/* Contact Form Section */}
				<div className="mt-8 md:mt-0 bg-white text-gray-800 p-6 rounded-lg shadow-md w-full md:max-w-md">
					<h2 className="text-2xl font-semibold mb-4 text-gray-800">
						Send Us a Message
					</h2>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							value={email.name}
							onChange={handleInputChange}
							required
							className="form-input rounded-md border-gray-300 p-3 outline-[#00a9d4]"
						/>
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={email.email}
							onChange={handleInputChange}
							required
							className="form-input rounded-md border-gray-300 p-3 outline-[#00a9d4]"
						/>
						<textarea
							name="message"
							placeholder="Your Message"
							value={email.message}
							onChange={handleInputChange}
							required
							rows={4}
							className="form-input rounded-md border-gray-300 p-3 outline-[#00a9d4]"
						></textarea>
						<button
							type="submit"
							className="bg-[#007592] hover:bg-[#002d39] text-white font-bold py-3 px-6 rounded"
						>
							Send Email
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ContactPage
