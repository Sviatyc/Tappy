import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebase";
import { setUser, clearUser } from "@/app/store/features/userSlice";
import { IUser } from "../types/userType";
import { RootState } from "../store/store";

export const useCurrentUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userObject: IUser = {
              id: currentUser.uid,
              username: userData?.username || "Unknown",
              email: userData?.email || currentUser.email || "",
              role: userData?.role || "user",
              messages: userData?.message || "",
              image: userData?.image || "https://imgcdn.stablediffusionweb.com/2024/6/7/09001582-ae8e-40c9-9334-d7716dd933bd.jpg",
              level: userData?.level || 0,
            };

            dispatch(setUser(userObject)); 
          } else {
            console.log("No such user data!");
            dispatch(clearUser()); 
          }
        } catch (err) {
          setError((err as Error).message);
        }
      } else {
        dispatch(clearUser()); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, user]); 

  return { loading, error };
};
