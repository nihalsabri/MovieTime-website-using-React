// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB_ThSlI7vsk89VqX60uBXpvaBmowa40EA",
  authDomain: "practice-6cb96.firebaseapp.com",
  projectId: "practice-6cb96",
  storageBucket: "practice-6cb96.firebasestorage.app",
  messagingSenderId: "88643024369",
  appId: "1:88643024369:web:b8533aaa863c25fc684050",
  measurementId: "G-BST7G3GHWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
