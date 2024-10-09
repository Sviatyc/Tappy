'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUserWithCredential } from '@/app/api/loginUserWithCredential'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

type Props = {
  isAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ isAccount }: Props) {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!email || !password) {
      setError("Будь ласка, введіть електронну пошту та пароль.");
      return;
    }

    const result = await loginUserWithCredential(email, password);

    if (result.success) {
      router.push('/tappy');
    } else {
      toast.error("Невірний логін або пароль"); 
      setError(""); 
    }
  };

  return (
    <>
      <form className='flex flex-col w-full mt-10 gap-1' onSubmit={handleSubmit}>
        <label className='font-semibold'>Email:</label>
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(''); 
          }}
          className='w-full px-1 h-10 rounded-sm text-black'
        />
        
        <label className='mt-5 font-semibold'>Password:</label>
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(''); 
          }}
          className='w-full px-1 h-10 rounded-sm text-black'
        />
        
        <button type="submit" className='w-full h-[40px] rounded-md bg-slate-800 mt-7 text-white'>Login</button>
        
        {error && <p className='text-red-500'>{error}</p>}
        
        <p>Don&apos;t have an account? 
          <span className='text-red-500 cursor-pointer' onClick={() => isAccount(false)}> 
            You can register!
          </span>
        </p>
      </form>
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default Login;
