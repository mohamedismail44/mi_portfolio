import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1WLlQKv6okpf3q2KJ-lSvElJGxuPnPw0",
  authDomain: "learn-firebase-2-65723.firebaseapp.com",
  projectId: "learn-firebase-2-65723",
  storageBucket: "learn-firebase-2-65723.appspot.com",
  messagingSenderId: "198709968093",
  appId: "1:198709968093:web:de65d34d9f4eb59083af34",
  measurementId: "G-XMNE2DSE5T",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
