//import functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFaRPMiBi_ELN9SUByFFp1wFJ_5pPlreU",
    authDomain: "to-do-list-96d7d.firebaseapp.com",
    projectId: "to-do-list-96d7d",
    storageBucket: "to-do-list-96d7d.appspot.com",
    messagingSenderId: "180851237987",
    appId: "1:180851237987:web:4d0a1224270894f0320456",
    measurementId: "G-X4D7P9FSVD"
  };


//initialize firebase
const app = initializeApp(firebaseConfig);

//initialize firestore
const db = getFirestore(app);

export { db };
