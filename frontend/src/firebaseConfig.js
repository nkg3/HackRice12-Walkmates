// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI5DnscDTbyADr2kWSRnLWRxbAEanuo7I",
  authDomain: "hackrice12-walkshare.firebaseapp.com",
  projectId: "hackrice12-walkshare",
  storageBucket: "hackrice12-walkshare.appspot.com",
  messagingSenderId: "192908567554",
  appId: "1:192908567554:web:aa18ba53983b079d81731b",
  measurementId: "G-BE1QVB34QQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const usersCollectionRef = collection(db, "users");
export const groupsCollectionRef = collection(db, "groups");
