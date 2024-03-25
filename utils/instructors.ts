// import { db } from './firebaseConfig'

// export const createInstructor = async (
// 	instructor: Omit<Instructor, 'id'>,
// 	file: File
// ) => {
// 	const photoUrl = await uploadImage(file)
// 	const docRef = await db.collection('instructors').add({
// 		...instructor,
// 		photoUrl
// 	})
// 	return docRef.id
// }

// export const updateInstructor = async (
// 	id: string,
// 	instructor: Partial<Instructor>,
// 	file?: File
// ) => {
// 	let photoUrl = instructor.photoUrl
// 	if (file) {
// 		photoUrl = await uploadImage(file)
// 	}
// 	await db
// 		.collection('instructors')
// 		.doc(id)
// 		.update({
// 			...instructor,
// 			photoUrl
// 		})
// }
// export const deleteInstructor = async (id: string, photoName: string) => {
// 	await db.collection('instructors').doc(id).delete()
// 	await storage.ref(`instructors/${photoName}`).delete()
// }
