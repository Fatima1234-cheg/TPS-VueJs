// src/Firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC00iFfuBNZPBUGaTJeo-rX8OxrSRhZvJo",
  authDomain: "app-vote-vue.firebaseapp.com",
  projectId: "app-vote-vue",
  storageBucket: "app-vote-vue.appspot.com",
  messagingSenderId: "1005231125940",
  appId: "1:1005231125940:web:d1e88f2ff718d24ad9eee1"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
