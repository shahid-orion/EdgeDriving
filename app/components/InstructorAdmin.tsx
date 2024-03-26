'use client'

import React, { useState, useEffect, ReactElement, ChangeEvent } from 'react'

// Assuming you have functions to handle Firebase operations
// import { addInstructor, updateInstructor, deleteInstructor } from '@/services/firebase';

// const InstructorAdmin = ({ existingInstructor, onSave, onCancel, onDelete }) => {
const InstructorAdmin = () => {
	const [instructor, setInstructor] = useState({
		name: '',
		photo: '',
		expertise: '',
		experience: '',
		description: ''
	})

	//   useEffect(() => {
	//     if (existingInstructor) {
	//       setInstructor(existingInstructor);
	//     }
	//   }, [existingInstructor]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setInstructor({ ...instructor, [name]: value })
	}

	//   const handleSubmit = (e) => {
	//     e.preventDefault();
	//     // onSave could be a prop function that determines whether to call add or update
	//     onSave(instructor);
	//     // Reset the form
	//     setInstructor({
	//       name: '',
	//       photo: '',
	//       expertise: '',
	//       experience: '',
	//       description: '',
	//     });
	//   };

	return (
		<div className="max-w-md mx-auto mt-8">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="block text-gray-700 text-xl font-bold mb-2">
					Instructor Details
				</h2>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name"
					>
						Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="name"
						name="name"
						type="text"
						placeholder="Instructor Name"
						value={instructor.name}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Repeat similar blocks for photo, expertise, experience, and description */}
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Save
					</button>
					{/* {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(instructor)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          )} */}
					<button
						type="button"
						// onClick={onCancel}
						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}

export default InstructorAdmin
