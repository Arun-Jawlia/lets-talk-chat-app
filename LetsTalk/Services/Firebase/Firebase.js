import { initializeApp } from "@react-native-firebase/app";
import {getAuth, GoogleAuthProvider} from '@react-native-firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCqR5NaDIFwSotYbhRFoW08SGofaUjWs-k",
  authDomain: "clone-9a0d1.firebaseapp.com",
  projectId: "clone-9a0d1",
  storageBucket: "clone-9a0d1.appspot.com",
  messagingSenderId: "837853890609",
  appId: "1:837853890609:web:8a017a94aaf057fee56d10"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()
export const firebaseAuth = getAuth()
