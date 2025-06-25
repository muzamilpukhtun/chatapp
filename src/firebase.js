import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAq4remO5N7aUGHlzy0is1Ok-XvXKBqqZI",
  authDomain: "chattingapplication-6cad7.firebaseapp.com",
  projectId: "chattingapplication-6cad7",
  storageBucket: "chattingapplication-6cad7.appspot.com",
  messagingSenderId: "780934001795",
  appId: "1:780934001795:web:df604630e5bec500e757b6",
  measurementId: "G-RZ4L4ZXGCG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
