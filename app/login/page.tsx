'use client'

// LoginPage.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react'

const LoginPage = () => {
	const [loginDetails, setLoginDetails] = useState({
		email: '',
		password: ''
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		// Handle login logic here
		console.log(loginDetails)
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
			<div className="max-w-md w-full bg-gradient-to-b from-[#00a9d4] to-[#06cdff] p-8 rounded-lg shadow-xl text-white">
				<h2 className="text-3xl font-bold text-center mb-8">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm font-medium">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={loginDetails.email}
							onChange={handleInputChange}
							required
							className="mt-1 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-white"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={loginDetails.password}
							onChange={handleInputChange}
							required
							className="mt-1 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-white"
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 rounded-md font-bold bg-[#007592] hover:bg-[#002d39] text-white"
					>
						Log In
					</button>
				</form>
				{/* Example for future login methods */}
				{/* <div className="mt-6 flex justify-center items-center space-x-2">
					<span className="text-sm">Or continue with</span>
					<button className="text-white">Google</button>
				</div> */}
			</div>
		</div>
	)
}

export default LoginPage
