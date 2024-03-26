'use client'

import { CarouselItem } from '@/types'
import React, { FormEvent, useState } from 'react'

const initialCarouselItems = [
	{
		id: 1,
		imageUrl: 'path/to/success1.jpg',
		caption: 'Our successful student 1'
	},
	{
		id: 2,
		imageUrl: 'path/to/success2.jpg',
		caption: 'Our successful student 2'
	},
	{
		id: 3,
		imageUrl: 'path/to/success3.jpg',
		caption: 'Our successful student 3'
	},
	{
		id: 4,
		imageUrl: 'path/to/success4.jpg',
		caption: 'Our successful student 4'
	}
]

const CarouselAdmin = () => {
	const [carouselItems, setCarouselItems] =
		useState<CarouselItem[]>(initialCarouselItems)
	const [editingItem, setEditingItem] = useState<CarouselItem | null>(null)

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target
		setEditingItem((prev) => (prev ? { ...prev, [name]: value } : null))
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (editingItem) {
			const isNewItem = editingItem.id === 0 // Assuming an ID of 0 means a new item
			const updatedItems = isNewItem
				? [
						...carouselItems,
						{
							...editingItem,
							id: Math.max(...carouselItems.map((item) => item.id)) + 1
						}
				  ]
				: carouselItems.map((item) =>
						item.id === editingItem.id ? editingItem : item
				  )
			setCarouselItems(updatedItems)
			setEditingItem(null)
		}
	}

	const handleEdit = (item: CarouselItem) => {
		setEditingItem(item)
	}

	const handleDelete = (id: number) => {
		setCarouselItems(carouselItems.filter((item) => item.id !== id))
	}

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 max-w-7xl mx-auto">
			<h2 className="text-xl font-semibold mb-4">Manage Carousel Items</h2>
			<form onSubmit={handleSubmit} className="mb-4">
				<div className="mb-3">
					<label
						htmlFor="imageUrl"
						className="block text-sm font-medium text-gray-700"
					>
						Image URL
					</label>
					<input
						id="imageUrl"
						name="imageUrl"
						type="text"
						value={editingItem?.imageUrl}
						onChange={handleInputChange}
						required
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
					/>
				</div>
				<button
					type="submit"
					className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
				>
					Save Item
				</button>
			</form>
			<div>
				{carouselItems.map((item) => (
					<div
						key={item.id}
						className="flex justify-between items-center border-b-2 py-2"
					>
						<span>{item.caption}</span>
						<div>
							<button
								onClick={() => handleEdit(item)}
								className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mr-2"
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(item.id)}
								className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CarouselAdmin
