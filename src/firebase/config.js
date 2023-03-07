// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCSG4pWTQGWEwV_9TBaakFgpTm2IRE1p4o',
	authDomain: 'udemy-journal-app-487a1.firebaseapp.com',
	projectId: 'udemy-journal-app-487a1',
	storageBucket: 'udemy-journal-app-487a1.appspot.com',
	messagingSenderId: '646775100867',
	appId: '1:646775100867:web:e8b8a9c5e6886408441976',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
