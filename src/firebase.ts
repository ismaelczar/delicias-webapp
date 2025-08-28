import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeJfC-f7aqluKpCDy_pUwJY1gSnnR6NvA",
  authDomain: "delicias-webapp.firebaseapp.com",
  databaseURL: "https://delicias-webapp-default-rtdb.firebaseio.com",
  projectId: "delicias-webapp",
  storageBucket: "delicias-webapp.firebasestorage.app",
  messagingSenderId: "994019786727",
  appId: "1:994019786727:web:ac4d5b526977c5ffa3c742",
  measurementId: "G-G2CGWTK6F1",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
