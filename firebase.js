// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAS8y7Kb35Dp7QWBnel9Nexf74kAcefOA",
  authDomain: "instagramv2-43d80.firebaseapp.com",
  projectId: "instagramv2-43d80",
  storageBucket: "instagramv2-43d80.appspot.com",
  messagingSenderId: "847753021772",
  appId: "1:847753021772:web:5ca4403c06e2d98ffe67e9",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
