// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAZcJuOAzIKafiOMxVK2THMxMQNAjCDc08',
	authDomain: 'edge-5703a.firebaseapp.com',
	databaseURL: 'https://edge-5703a-default-rtdb.firebaseio.com',
	projectId: 'edge-5703a',
	storageBucket: 'edge-5703a.appspot.com',
	messagingSenderId: '563684902230',
	appId: '1:563684902230:web:e0c9dcc10b450ff37602f7'
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)

//OR
// Initialize Firebase if it's not already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth }
