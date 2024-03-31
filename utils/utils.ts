import { FirestoreDocument } from '@/types'
import { collection, getDocs, Firestore } from 'firebase/firestore'

//Utility function to fetch all documents from a specified collection
export async function fetchCollectionData<T>(
	db: Firestore,
	collectionName: string
): Promise<FirestoreDocument<T>[]> {
	const collectionRef = collection(db, collectionName)
	const snapshot = await getDocs(collectionRef)
	const documents = snapshot.docs.map(
		(doc) => ({ id: doc.id, ...doc.data() } as FirestoreDocument<T>)
	)
	return documents
}
