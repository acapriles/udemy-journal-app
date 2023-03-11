// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
	VITE_APIKEY,
	VITE_AUTHDOMAIN,
	VITE_PROJECTID,
	VITE_STORAGEBUCKET,
	VITE_MESSAGINGSENDERID,
	VITE_APPID,
} = getEnvironments();

// console.log(process.env);
// console.log( import.meta.env );

// Your web app's Firebase configuration
// Dev/Pro
/* const firebaseConfig = {
	apiKey: 'AIzaSyCSG4pWTQGWEwV_9TBaakFgpTm2IRE1p4o',
	authDomain: 'udemy-journal-app-487a1.firebaseapp.com',
	projectId: 'udemy-journal-app-487a1',
	storageBucket: 'udemy-journal-app-487a1.appspot.com',
	messagingSenderId: '646775100867',
	appId: '1:646775100867:web:e8b8a9c5e6886408441976',
}; */

// Testing
/* const firebaseConfig = {
	apiKey: 'AIzaSyC0-g2Lhi09Qe-7LD2oKAQMVFEjYSyqStY',
	authDomain: 'udemy-journal-app-test.firebaseapp.com',
	projectId: 'udemy-journal-app-test',
	storageBucket: 'udemy-journal-app-test.appspot.com',
	messagingSenderId: '810947645625',
	appId: '1:810947645625:web:0a11a07b7dbc304daecb68',
}; */

const firebaseConfig = {
	apiKey: VITE_APIKEY,
	authDomain: VITE_AUTHDOMAIN,
	projectId: VITE_PROJECTID,
	storageBucket: VITE_STORAGEBUCKET,
	messagingSenderId: VITE_MESSAGINGSENDERID,
	appId: VITE_APPID,
};

// console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
