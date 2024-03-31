'use client'

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { db } from '@/firebaseConfig'
import { Service, ServiceType } from '@/types'
import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc
} from 'firebase/firestore'
import { PuffLoader } from 'react-spinners'
import toast from 'react-hot-toast'

const ServicesAdmin = () => {
	const [services, setServices] = useState<Service[]>([])
	const [selectedService, setSelectedService] = useState<Service | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
			const fetchedServices: Service[] = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			})) as Service[]
			setServices(fetchedServices)
			setIsLoading(false)
		})

		return () => unsubscribe()
	}, [])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setSelectedService((prev) => ({ ...prev, [name]: value } as Service))
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const toastId = toast.loading('Please Wait...')
		if (!selectedService) return

		const { id, ...data } = selectedService
		if (id) {
			await setDoc(doc(db, 'services', String(id)), data)
		} else {
			await addDoc(collection(db, 'services'), data)
		}

		//toast notification
		toast.success('Updated successfully!', {
			id: toastId
		})

		setSelectedService(null)
	}

	const handleDelete = async (id: string) => {
		const toastId = toast.loading('Please Wait...')

		await deleteDoc(doc(db, 'services', String(id)))
		setServices(services.filter((service) => service.id !== id.toString()))

		toast.success('Deleted successfully!', {
			id: toastId
		})
	}

	const handleEdit = (service: Service) => {
		setSelectedService(service)
	}

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 max-w-7xl mx-auto space-y-6">
			<h2 className="text-4xl font-semibold mb-5 text-center">
				Manage Services
			</h2>
			{isLoading ? (
				<div className="flex justify-center items-center">
					<PuffLoader color="#36d7b7" />
				</div>
			) : (
				<>
					<form
						onSubmit={handleSubmit}
						className="space-y-6 p-6 rounded-lg shadow bg-[#00a9d4]"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Service Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									value={selectedService?.name || ''}
									onChange={handleChange}
									required
									className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
								/>
							</div>

							<div>
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-700"
								>
									Description
								</label>
								<textarea
									id="description"
									name="description"
									value={selectedService?.description || ''}
									onChange={handleChange}
									required
									className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4] h-32"
								/>
							</div>

							<div>
								<label
									htmlFor="service"
									className="block text-sm font-medium text-gray-700"
								>
									Service Type
								</label>
								<select
									id="service"
									name="service"
									value={selectedService?.service || ''}
									onChange={handleChange}
									className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
								>
									{/* Populate with your service types */}
									<option value="GENERAL">GENERAL</option>
									<option value="INTENSIVE">INTENSIVE</option>
									<option value="PACKAGE">PACKAGE</option>
									<option value="CAR HIRE FOR DRIVING TEST">
										CAR HIRE FOR DRIVING TEST
									</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="price"
									className="block text-sm font-medium text-gray-700"
								>
									Price
								</label>
								<input
									id="price"
									name="price"
									type="number"
									value={selectedService?.price || ''}
									onChange={handleChange}
									required
									className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
								/>
							</div>
						</div>

						<div className="flex justify-end mt-4">
							<button
								type="submit"
								className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
								text-sm font-medium rounded-md text-white bg-[#007592] hover:bg-[#002d39]"
							>
								Save Service
							</button>
						</div>
					</form>

					{/* List of services */}
					{services.map((service) => (
						<div
							key={service.id}
							className="flex flex-col md:flex-row justify-between items-center border-b-2 py-2 bg-gray-100 p-4 rounded shadow"
						>
							<div className="mb-2">
								<h3 className="text-lg font-semibold">{service.name}</h3>
								<p className="text-sm text-gray-500">{service.description}</p>
							</div>
							<div className="flex">
								<button
									onClick={() => handleEdit(service)}
									className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded mx-2"
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(service.id!)}
									className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	)
}

export default ServicesAdmin
