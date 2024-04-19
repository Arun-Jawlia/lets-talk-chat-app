import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyD5ZxlGVo54BmYAf52MSia7liZ1lm-CJ2o",
  authDomain: "lets-connect-chat-app-3f8fc.firebaseapp.com",
  projectId: "lets-connect-chat-app-3f8fc",
  storageBucket: "lets-connect-chat-app-3f8fc.appspot.com",
  messagingSenderId: "977265989922",
  appId: "1:977265989922:web:fa0017db3911046a3dad7b"
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()
export const firebaseAuth = getAuth()

