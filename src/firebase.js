// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCJHkX_5hD-QMxzjzbjH8xHYILg0KxjZm4",
  authDomain: "mychat-54a9a.firebaseapp.com",
  projectId: "mychat-54a9a",
  storageBucket: "mychat-54a9a.appspot.com",
  messagingSenderId: "917771063765",
  appId: "1:917771063765:web:51d81c10b6d942af1c2d5c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();