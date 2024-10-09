import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from '@/app/firebase/firebase';

type Props = {
    username: string;
    email: string;
    password: string;
};

const createUserWithCredential = async ({ username, email, password }: Props) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', String(auth.currentUser?.uid)), {
            username: username,
            email: auth.currentUser?.email,
            id: auth.currentUser?.uid,
            role: 'user',
            messages: []

        });
    } catch (error) {
        throw error;
    }
};

export default createUserWithCredential;
