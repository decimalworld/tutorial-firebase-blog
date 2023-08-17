import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdS5Ed_MD4IL7ldcF2XT8qNx5g0A25h1c",
  authDomain: "firebog-3c9f0.firebaseapp.com",
  projectId: "firebog-3c9f0",
  storageBucket: "firebog-3c9f0.appspot.com",
  messagingSenderId: "241074195390",
  appId: "1:241074195390:web:944d07b120e62cac2847ef",
  measurementId: "G-8ZW3SW68Y1"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp);
const storage = getStorage(firebaseApp);
const timestamp = db.serverTimestamp;

export { timestamp, firebaseApp, db, auth, functions, storage }
