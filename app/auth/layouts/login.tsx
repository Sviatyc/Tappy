'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUserWithCredential } from '@/app/api/loginUserWithCredential'; 

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
    const result = await loginUserWithCredential(email || '', password || '');

    if (result.success) {
      router.push('/tappy');
    } else {
      setError(result.message ?? ''); 
    }
  };

  return (
    <form className='flex flex-col px-10 mt-10 gap-1' onSubmit={handleSubmit}>
      <label className='font-semibold'>Email:</label>
      <input
        type="email"
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full px-1 h-10 rounded-sm text-black'
      />
      
      <label className='mt-5 font-semibold'>Password:</label>
      <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full px-1 h-10 rounded-sm text-black'
      />
      
      <button type="submit" className='w-full h-[40px] rounded-md bg-slate-800 mt-7'>Login</button>
      {error && <p className='text-red-500'>{error}</p>}
      <p>Don't have an account? 
        <span className='text-red-500 cursor-pointer' onClick={() => isAccount(false)}> 
          You can register!
        </span>
      </p>
    </form>
  );
}

export default Login;
