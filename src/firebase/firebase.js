import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFaRPMiBi_ELN9SUByFFp1wFJ_5pPlreU",
  authDomain: "to-do-list-96d7d.firebaseapp.com",
  projectId: "to-do-list-96d7d",
  storageBucket: "to-do-list-96d7d.appspot.com",
  messagingSenderId: "180851237987",
  appId: "1:180851237987:web:4d0a1224270894f0320456",
  measurementId: "G-X4D7P9FSVD"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };