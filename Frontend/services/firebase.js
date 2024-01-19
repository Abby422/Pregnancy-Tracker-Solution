import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: `${process.env.REACT_NATIVE_API_KEY}}`,
  authDomain: `${process.env.REACT_NATIVE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_NATIVE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_NATIVE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_NATIVE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_NATIVE_APP_ID}`,
};

const app = initializeApp(firebaseConfig);

export default app;
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);
