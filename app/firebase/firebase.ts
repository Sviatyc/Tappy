import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOKxBLKce1qQhxwE_Li-SPL5DYFVKUF6I",
  authDomain: "tappy-6d61d.firebaseapp.com",
  projectId: "tappy-6d61d",
  storageBucket: "tappy-6d61d.appspot.com",
  messagingSenderId: "617961056398",
  appId: "1:617961056398:web:c7675ed8d07ab1344e01df",
  measurementId: "G-YX38V26LXC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
