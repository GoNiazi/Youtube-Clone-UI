// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiFejc2xKRmdDf2GO1RVmjkoKgcMfjsLY",
  authDomain: "video-69b3d.firebaseapp.com",
  projectId: "video-69b3d",
  storageBucket: "video-69b3d.appspot.com",
  messagingSenderId: "798486339626",
  appId: "1:798486339626:web:81ba2876ed4048eb91a353",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
