import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC00iFfuBNZPBUGaTJeo-rX8OxrSRhZvJo",
  authDomain: "app-vote-vue.firebaseapp.com",
  projectId: "app-vote-vue",
  storageBucket: "app-vote-vue.firebasestorage.app",
  messagingSenderId: "1005231125940",
  appId: "1:1005231125940:web:d1e88f2ff718d24ad9eee1",
  measurementId: "G-RW7HCJPFCK"
};


// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Fournisseur Google
export const googleProvider = new GoogleAuthProvider();
