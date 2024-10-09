import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { FirebaseError } from 'firebase/app';

export const loginUserWithCredential = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
      return { success: false, message: 'Incorrect email or password' };
    } else {
      console.error('Error logging in:', firebaseError.message);
      return { success: false, message: 'Email or password is not correct.' };
    }
  }
};
