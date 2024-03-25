// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getFunctions } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCljfahlNyhL91A6EPyCFyz5IP1pfi1Ro0',
	authDomain: 'edge-93d39.firebaseapp.com',
	projectId: 'edge-93d39',
	storageBucket: 'edge-93d39.appspot.com',
	messagingSenderId: '246959789901',
	appId: '1:246959789901:web:98b9640da78198106cc904'
}

// Initialize Firebase if it's not already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
//const auth = getAuth(app)
//const functions = getFunctions(app)
const storage = getStorage(app)

export { db, storage }
