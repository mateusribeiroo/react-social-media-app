import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhFXcsy0TKkurPlPAqF4K-WByfs-UVtxk",
  authDomain: "react-social-media-app-92979.firebaseapp.com",
  projectId: "react-social-media-app-92979",
  storageBucket: "react-social-media-app-92979.appspot.com",
  messagingSenderId: "759721853575",
  appId: "1:759721853575:web:615a68825d73f9d67c2e22"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);