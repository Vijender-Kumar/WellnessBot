import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMe2EBKKtnswLHGL_JbB_qbTP3XrbF94I",
  authDomain: "wellnessbot-f2fde.firebaseapp.com",
  projectId: "wellnessbot-f2fde",
  storageBucket: "wellnessbot-f2fde.appspot.com",
  messagingSenderId: "423797015025",
  appId: "1:423797015025:web:5a1fef8f00f49cbd918450",
  measurementId: "G-0M7X7VX4XZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);