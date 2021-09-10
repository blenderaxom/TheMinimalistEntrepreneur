import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPixmuIQCV8tSheU6rV874fB0cANn8BWc",
  authDomain: "theminimalistentrepreneur.firebaseapp.com",
  projectId: "theminimalistentrepreneur",
  storageBucket: "theminimalistentrepreneur.appspot.com",
  messagingSenderId: "976512450438",
  appId: "1:976512450438:web:3b6e0c765d12433ec83607",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);