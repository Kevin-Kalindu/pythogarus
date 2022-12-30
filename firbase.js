// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXY_E7ZmlqK1f6Ox4xAdJw2wHMVjq1BNA",
  authDomain: "ammi-clone.firebaseapp.com",
  projectId: "ammi-clone",
  storageBucket: "ammi-clone.appspot.com",
  messagingSenderId: "166332552054",
  appId: "1:166332552054:web:d8faaffacd71e1d8b12057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, db, storage};