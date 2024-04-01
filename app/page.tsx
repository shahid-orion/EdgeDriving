import Link from 'next/link'
import Card from './components/Card'
import SuccessCarousel from './components/SuccessCarousel'

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 text-gray-800">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center md:mt-4">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
					Welcome to{' '}
					{/* <span className="text-indigo-700">Edge Driving Instruction!</span> */}
					<span className="text-[#007592]">Edge Driving Instruction!</span>
				</h1>
				<p className="text-3xl text-gray-600 mt-10">
					Get started by booking your first lesson.
				</p>

				<div className="mt-6 flex flex-col md:flex-row items-center justify-between">
					<section className="text-3xl md:text-4xl border bg-[#007592] hover:bg-[#002d39] p-2 rounded-md mx-5">
						<a
							href="tel:0469046923"
							className="font-bold text-[#fff]  transition-colors duration-200 mx-4"
						>
							Call Now
						</a>
					</section>
					<a
						href="tel:0469046923"
						className="font-bold text-[#002d39] text-5xl transition-colors duration-200 mx-4"
					>
						0469 046 923
					</a>
				</div>
			</main>

			{/* Success Carousel */}
			<div className="mt-8 w-full">
				<h1 className="text-center font-serif text-2xl sm:text-3xl md:text-4xl mb-8 text-gray-800">
					Some of Our success stories...
				</h1>
				<SuccessCarousel />
			</div>
			{/* Other content */}

			{/* Cards */}
			<div className="py-12">
				<h2 className="text-center text-4xl font-bold mb-6 text-gray-800">
					Why Choose Edge Driving Instruction?
				</h2>
				{/* // In your Home component where you render the cards */}
				<div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 items-stretch">
					<Card
						title="Experienced Instructors"
						content="Our instructors are certified and have years of experience."
					/>
					<Card
						title="Flexible Scheduling"
						content="Book lessons at times that work best for you."
					/>
					<Card
						title="Comprehensive Curriculum"
						content="Learn everything from the basics to advanced driving techniques."
					/>
					{/* Additional cards */}
				</div>
			</div>
		</div>
	)
}
