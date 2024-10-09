import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getUserById = async (userId: string) => {
  const userRef = doc(db, 'users', userId); 
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data(); 
  } else {
    throw new Error("User not found"); 
  }
};
