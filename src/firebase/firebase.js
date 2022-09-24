// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBw6iQG6P336hzUUh8s2TrlxvKAuK854o0',
	authDomain: 'chat-app-cc-322da.firebaseapp.com',
	projectId: 'chat-app-cc-322da',
	storageBucket: 'chat-app-cc-322da.appspot.com',
	messagingSenderId: '44624771669',
	appId: '1:44624771669:web:778264cd7963e718c432dc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);