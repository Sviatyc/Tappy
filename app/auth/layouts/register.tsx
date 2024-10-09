import React, { useState } from 'react';
import createUserWithCredential from '@/app/api/createUserWithCredential';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FirebaseError } from "firebase/app";
import { db } from '@/app/firebase/firebase';
type Props = {
  isAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

function Register({ isAccount }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const checkUsernameExists = async (username: string): Promise<boolean> => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username)); 
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; 
  };

  const createUser = async () => {
    try {
        await createUserWithCredential({ email, password, username });
    } catch (error) {
        setErrors({});
        if (error instanceof FirebaseError) {
            if (error.code === 'auth/email-already-in-use') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Ця електронна адреса вже зареєстрована.',
                }));
            } else if (error.code === 'auth/invalid-email') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Некоректна електронна адреса.',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Сталася помилка під час реєстрації. Спробуйте ще раз.',
                }));
            }
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Сталася невідома помилка. Спробуйте ще раз.',
            }));
        }
    }
};


  
  

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username: string) => {
    return username.length > 0;
  };

  const validateForm = async () => {
    const formErrors: { username?: string; email?: string; password?: string; confirmPassword?: string } = {};

    if (!username) {
      formErrors.username = 'Username is required';
    } else if (!validateUsername(username)) {
      formErrors.username = 'Invalid username';
    } else {
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
        formErrors.username = 'Username is already taken';
      }
    }

    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Invalid email address';
    }

    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await validateForm()) {
      createUser();
    }
  };

  return (
    <form className='flex flex-col items-center mt-10 gap-1 px-10' onSubmit={handleSubmit}>
      <label className='font-semibold'>Username:</label>
      <input
        type="text"
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={`w-full px-1 h-10 rounded-sm text-black ${errors.username ? 'border-red-500 border' : ''}`}
      />
      {errors.username && <p className='text-red-500 text-sm'>{errors.username}</p>}

      <label className='mt-1 font-semibold'>Email:</label>
      <input
        type="email"
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full px-1 h-10 rounded-sm text-black ${errors.email ? 'border-red-500 border' : ''}`}
      />
      {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

      <label className='mt-1 font-semibold'>Password:</label>
      <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`w-full px-1 h-10 rounded-sm text-black ${errors.password ? 'border-red-500 border' : ''}`}
      />
      {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

      <label className='mt-1 font-semibold'>Confirm password:</label>
      <input
        type="password"
        placeholder='Confirm password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`w-full px-1 h-10 rounded-sm text-black ${errors.confirmPassword ? 'border-red-500 border' : ''}`}
      />
      {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}

      <button type="submit" className='w-full h-[40px] rounded-md bg-slate-800 mt-7'>
        Register
      </button>

      <p>
        Already have an account?{' '}
        <span className='text-red-500 cursor-pointer' onClick={() => isAccount(true)}>
          You can login!
        </span>
      </p>
    </form>
  );
}

export default Register;
