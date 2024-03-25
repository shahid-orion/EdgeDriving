// // utils/firebaseOperations.ts
// import { User } from '@/types/types'
// import { db } from './firebaseConfig'
// import { storage } from './firebaseConfig'

// export const addUser = async (user: User): Promise<void> => {
// 	await db.collection('users').doc(user.id).set(user)
// }
// export const fetchUsers = async (): Promise<User[]> => {
// 	const snapshot = await db.collection('users').get()
// 	return snapshot.docs.map((doc) => doc.data() as User)
// }

// export const fetchUserById = async (id: string): Promise<User | undefined> => {
// 	const doc = await db.collection('users').doc(id).get()
// 	return doc.exists ? (doc.data() as User) : undefined
// }
// export const updateUser = async (
// 	id: string,
// 	updatedFields: Partial<User>
// ): Promise<void> => {
// 	await db.collection('users').doc(id).update(updatedFields)
// }
// export const deleteUser = async (id: string): Promise<void> => {
// 	await db.collection('users').doc(id).delete()
// }

// export const uploadImage = async (file: File): Promise<string> => {
// 	const uploadTaskSnapshot = await storage
// 		.ref(`instructors/${file.name}`)
// 		.put(file)
// 	const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL()
// 	return downloadURL
// }
