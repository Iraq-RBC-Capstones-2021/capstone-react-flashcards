import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "educards-23b77.firebaseapp.com",
  projectId: "educards-23b77",
  storageBucket: "educards-23b77.appspot.com",
  messagingSenderId: "1075328991540",
  appId: "1:1075328991540:web:27785ec47faee06da12561",
});

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { db, auth, storage };

export default app;
