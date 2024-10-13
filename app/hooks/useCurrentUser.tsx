import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebase"; 
import { IUser } from "../types/userType";

  
  export const useCurrentUser = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUser({
                id: currentUser.uid,
                username: userData?.username || "Unknown",
                email: userData?.email || currentUser.email || "",
                role: userData?.role || "user",
                messages: userData?.message || "",
                image: userData?.image || "https://imgcdn.stablediffusionweb.com/2024/6/7/09001582-ae8e-40c9-9334-d7716dd933bd.jpg",
                level: userData?.level || 0,
                chiken: userData?.chiken 
              });
            } else {
              console.log("No such user data!");
              setUser(undefined);
            }
          } catch (err) {
            setError((err as Error).message);
          }
        } else {
          setUser(undefined);
        }
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    return { user, loading, error };
  };
  