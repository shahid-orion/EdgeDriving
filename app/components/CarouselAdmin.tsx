'use client'

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { db, storage } from '@/firebaseConfig'
import { CarouselItem } from '@/types'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import {
	collection,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	onSnapshot
} from 'firebase/firestore'
import { PuffLoader } from 'react-spinners'
import toast from 'react-hot-toast'

const CarouselAdmin = () => {
	const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([])
	const [editingItem, setEditingItem] = useState<CarouselItem | null>(null)
	const [isLoading, setIsLoading] = useState(true) // State to manage loading status
	const [file, setFile] = useState<File | null>(null) // Keep track of the selected file
	const [imagePreview, setImagePreview] = useState('')

	useEffect(() => {
		setIsLoading(true) // Start the loader before fetching data

		const unsubscribe = onSnapshot(
			collection(db, 'carouselItems'),
			(snapshot) => {
				const items = snapshot.docs.map(
					(doc) => ({ id: doc.id, ...doc.data() } as CarouselItem)
				)
				setCarouselItems(items)
				setIsLoading(false) // Stop the loader after fetching data
			}
		)

		return () => unsubscribe() // Clean up the subscription
	}, [])

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0])
		}
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setEditingItem((prev) => ({ ...prev, [name]: value })) // Always create a new object
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const toastId = toast.loading('Please Wait...')
		let imageUrl = editingItem?.imageUrl

		if (file) {
			const fileRef = ref(storage, `carouselImages/${file.name}`)
			const uploadTask = await uploadBytes(fileRef, file)
			imageUrl = await getDownloadURL(uploadTask.ref)
		}

		const itemData = {
			...editingItem,
			imageUrl,
			caption: editingItem?.caption
		}

		if (editingItem?.id) {
			await updateDoc(doc(db, 'carouselItems', editingItem.id), itemData)
		} else {
			await addDoc(collection(db, 'carouselItems'), itemData)
		}

		//toast notification
		toast.success('Uploaded successfully!', {
			id: toastId
		})

		setEditingItem(null) // Reset editing item
		setFile(null) // Reset file
	}
	const handleEdit = (item: CarouselItem) => {
		setEditingItem(item)
		setImagePreview(item.imageUrl || '')
	}

	const handleDelete = async (id: string) => {
		const toastId = toast.loading('Please Wait...')
		const docRef = doc(db, 'carouselItems', id)
		await deleteDoc(docRef)
		setCarouselItems(carouselItems.filter((item) => item.id !== id))
		//toast notification
		toast.success('Deleted successfully!', {
			id: toastId
		})
	}

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 max-w-7xl mx-auto">
			<h2 className="text-4xl font-semibold mb-5 text-center">
				Manage Carousel Items
			</h2>
			{/* Loader */}
			{isLoading ? (
				<div className="flex justify-center items-center">
					<PuffLoader color="#36d7b7" />
				</div>
			) : (
				// Your form and carousel item list go here
				<form
					onSubmit={handleSubmit}
					className="space-y-6 p-6 rounded-lg shadow bg-[#00a9d4] mb-5"
				>
					<div className="mb-3">
						<label
							htmlFor="file"
							className="block text-sm font-medium text-gray-700"
						>
							Image
						</label>
						<input
							id="file"
							name="file"
							type="file"
							onChange={handleFileChange}
							required={!editingItem}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
							focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="caption"
							className="block text-sm font-medium text-gray-700"
						>
							Caption
						</label>
						<input
							id="caption"
							name="caption"
							type="text"
							value={editingItem?.caption}
							onChange={handleInputChange}
							required
							className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
						/>
					</div>
					<button
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                            text-sm font-medium rounded-md text-white bg-[#007592] hover:bg-[#002d39]"
					>
						Save Item
					</button>
				</form>
			)}
			{carouselItems.map((item) => (
				<div
					key={item.id}
					className="flex justify-between items-center border-b-2 py-2 my-2 bg-gray-100 rounded p-4 shadow"
				>
					<div>
						<p className="text-lg">{item.caption}</p>
					</div>
					<div>
						<button
							onClick={() => handleEdit(item)}
							className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded mr-2"
						>
							Edit
						</button>
						<button
							onClick={() => handleDelete(item.id)}
							className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-1 md:mt-0"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default CarouselAdmin
