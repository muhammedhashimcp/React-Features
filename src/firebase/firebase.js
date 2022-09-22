// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
	apiKey: 'AIzaSyDnBbSc29AfV7u09JCxRyhJbYwcsXVB_ds',
	authDomain: 'react-samples-11e82.firebaseapp.com',
	projectId: 'react-samples-11e82',
	storageBucket: 'react-samples-11e82.appspot.com',
	messagingSenderId: '177893528454',
	appId: '1:177893528454:web:0849d527f0dcb50c5b1207',
	measurementId: 'G-FS32N6MEPK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
