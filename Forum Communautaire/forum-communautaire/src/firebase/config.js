// Import Firebase v9
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// ---- CONFIGURATION FIREBASE ----
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQGUWhDLya5fV3tqro_LHqC8NEPTeVsmg",
  authDomain: "forum-communautaire-b79bd.firebaseapp.com",
  projectId: "forum-communautaire-b79bd",
  storageBucket: "forum-communautaire-b79bd.firebasestorage.app",
  messagingSenderId: "876778222272",
  appId: "1:876778222272:web:da61f035822e556b773325",
  measurementId: "G-848C8BY3P6"
};

// ---- INITIALISATION ----
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };