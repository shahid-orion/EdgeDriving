'use client'

import React, {
	useState,
	useEffect,
	ChangeEvent,
	FormEvent,
	useRef
} from 'react'
import { db, storage } from '@/firebaseConfig'
import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc
} from 'firebase/firestore'
import { Instructor } from '@/types'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { fetchCollectionData } from '@/utils/utils'
import toast from 'react-hot-toast'
import { PuffLoader } from 'react-spinners'

const AboutAdmin = () => {
	const [instructors, setInstructors] = useState<Instructor[]>([])
	const [selectedInstructor, setSelectedInstructor] =
		useState<Instructor | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [editingItem, setEditingItem] = useState<Instructor | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	// useEffect(() => {
	// 	const fetchInstructors = async () => {
	// 		const fetchedInstructors = await fetchCollectionData<Instructor>(
	// 			db,
	// 			'instructors'
	// 		)
	// 		setInstructors(fetchedInstructors)
	// 		setIsLoading(false)
	// 	}

	// 	fetchInstructors()
	// }, [])

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, 'instructors'),
			(snapshot) => {
				const fetchedInstructors = snapshot.docs.map((doc) => ({
					id: doc.id,
					...(doc.data() as Omit<Instructor, 'id'>)
				}))
				setInstructors(fetchedInstructors)
				setIsLoading(false)
			}
		)

		return () => unsubscribe()
	}, [])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setSelectedInstructor((prev) => ({ ...prev, [name]: value } as Instructor))
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			const fileSize = file.size / 1024 / 1024 // Convert bytes to MB
			const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

			if (fileSize > 5) {
				toast.error('File size should not exceed 5 MB.')
				// Reset the file input
				e.target.value = ''
				return // Exit the function
			} else if (!allowedTypes.includes(file.type)) {
				toast.error('Only image files (jpeg, png, gif) are allowed.')
				// Reset the file input
				e.target.value = ''
				return // Exit the function
			} else {
				setSelectedInstructor((prev) => ({
					...prev,
					file: file
				}))
			}
		}
	}

	// Adjusted handleSubmit to clear all fields, including description, upon successful submit
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		const toastId = toast.loading('Please Wait...')

		if (!selectedInstructor) return

		let photoUrl = selectedInstructor.photoUrl
		if (selectedInstructor.file) {
			const storageRef = ref(
				storage,
				`instructors/${selectedInstructor.file.name}`
			)
			const uploadResult = await uploadBytes(
				storageRef,
				selectedInstructor.file
			)
			photoUrl = await getDownloadURL(uploadResult.ref)
		}

		const { id, file, ...data } = selectedInstructor
		const instructorData = { ...data, photoUrl }

		try {
			if (id) {
				await setDoc(doc(db, 'instructors', id), instructorData)
			} else {
				await addDoc(collection(db, 'instructors'), instructorData)
			}
			setSelectedInstructor(null) // Reset the entire selectedInstructor state to clear all fields
			// Clear the file input
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
			toast.success('Updated successfully!', { id: toastId })
		} catch (error) {
			toast.error('Failed to update!', { id: toastId })
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async (id: string) => {
		const toastId = toast.loading('Please Wait...')
		await deleteDoc(doc(db, 'instructors', id))
		setInstructors(instructors.filter((instructor) => instructor.id !== id))
		toast.success('Deleted successfully!', {
			id: toastId
		})
	}
	const handleEdit = (instructor: Instructor) => {
		setSelectedInstructor(instructor)
	}

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-5 max-w-7xl mx-auto">
			<h2 className="text-4xl font-semibold mb-5 text-center">
				Manage Instructors
			</h2>
			{isLoading ? (
				<div className="flex justify-center items-center">
					<PuffLoader color="#36d7b7" />
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className="space-y-6 p-6 rounded-lg shadow bg-[#00a9d4]"
				>
					<div className="grid-cols-1 md:grid md:grid-cols-2 gap-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								value={selectedInstructor?.name || ''}
								onChange={handleChange}
								required
								className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
							/>
						</div>

						<div>
							<label
								htmlFor="expertise"
								className="block text-sm font-medium text-gray-700"
							>
								Expertise
							</label>
							<input
								id="expertise"
								name="expertise"
								type="text"
								value={selectedInstructor?.expertise || ''}
								onChange={handleChange}
								required
								className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
							/>
						</div>

						<div>
							<label
								htmlFor="experience"
								className="block text-sm font-medium text-gray-700"
							>
								Experience
							</label>
							<input
								id="experience"
								name="experience"
								type="text"
								value={selectedInstructor?.experience || ''}
								onChange={handleChange}
								required
								className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4]"
							/>
						</div>

						<div className="col-span-2">
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700"
							>
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={selectedInstructor?.description || ''}
								maxLength={360}
								onChange={handleChange}
								required
								className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-[#00a9d4] h-32"
							/>
						</div>

						<div className="col-span-2">
							<label
								htmlFor="file"
								className="block text-sm font-medium text-gray-700"
							>
								Instructor Image
							</label>
							<input
								id="file"
								name="file"
								type="file"
								required={!selectedInstructor}
								onChange={handleFileChange}
								ref={fileInputRef} // Assign the ref here
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
							/>
						</div>
					</div>

					<div className="flex justify-end mt-4">
						<button
							type="submit"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#007592] hover:bg-[#002d39]"
						>
							Save Instructor
						</button>
					</div>
				</form>
			)}

			{instructors.map((instructor) => (
				<div
					key={instructor.id}
					className="flex justify-between items-center border-b-2 py-2 bg-gray-100 p-4 rounded shadow mt-2"
				>
					<div className="">
						<h3 className="text-lg font-semibold">{instructor.name}</h3>
						<p className="text-sm text-gray-500">{instructor.expertise}</p>
						<p className="text-sm text-gray-500">
							Experience: {instructor.experience}
						</p>
					</div>
					<div className="flex flex-col md:flex-row items-end">
						<button
							onClick={() => handleEdit(instructor)}
							className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded md:mr-2"
						>
							Edit
						</button>
						<button
							onClick={() => handleDelete(instructor.id!)}
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

export default AboutAdmin
