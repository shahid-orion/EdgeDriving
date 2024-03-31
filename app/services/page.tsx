'use client'

import React, { useState, useEffect } from 'react'
import { fetchCollectionData } from '@/utils/utils'
import { db } from '@/firebaseConfig'
import { Service } from '@/types'
import { DocumentData } from 'firebase/firestore'

const Services = () => {
	const [services, setServices] = useState<Service[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const fetchedServices: DocumentData[] =
				await fetchCollectionData<Service>(db, 'services')
			setServices(fetchedServices)
			setIsLoading(false)
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div>Loading...</div>
			</div>
		)
	}

	return (
		<div className="bg-white py-8 px-4 md:px-8 lg:px-12">
			<h1 className="text-4xl text-center font-semibold mb-10 sm:text-5xl md:text-6xl text-gray-800">
				Our Services
			</h1>
			<div className="flex justify-center">
				<div
					className={`grid ${
						services.length === 1
							? 'grid-cols-1 justify-center'
							: services.length === 2
							? 'grid-cols-2 justify-center'
							: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
					} gap-12 mx-auto`}
				>
					{services.map((service: Service) => (
						<div
							key={service.id}
							className="bg-white rounded-lg shadow overflow-hidden mx-auto"
							style={{ maxWidth: '300px' }}
						>
							<div className="p-5 flex flex-col justify-between h-full">
								<div>
									<h3 className="text-xl font-bold mb-2">{service.name}</h3>
									<p className="text-gray-700 mb-4">{service.description}</p>
								</div>
								<div className="text-xl font-semibold text-[#007c9b]">
									Price: ${service.price}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Services
