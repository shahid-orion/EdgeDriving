import React from 'react'
import hero from '../../assets/AI-Images/hero-image.png'

const Banner = () => {
	return (
		<div
			className="relative bg-cover bg-center text-white"
			style={{ backgroundImage: `url('${hero}')` }}
		>
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-6xl font-bold">
					Welcome to Edge Driving Instruction
				</h1>
				<p className="mt-3 text-2xl">
					Get started by booking your first lesson.
				</p>
			</div>
		</div>
	)
}

export default Banner
