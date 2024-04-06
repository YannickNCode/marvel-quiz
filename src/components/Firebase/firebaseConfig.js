import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDz4w9Lvx7wBptLrV2uh6bJ_4x-jxVRIfM',
	authDomain: 'marvel-quiz-6ea05.firebaseapp.com',
	projectId: 'marvel-quiz-6ea05',
	storageBucket: 'marvel-quiz-6ea05.appspot.com',
	messagingSenderId: '1088980226382',
	appId: '1:1088980226382:web:2ff293e8a22dab8b018e1f',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const firestore = getFirestore();

export const user = (uid) => doc(firestore, `users/${uid}`);
