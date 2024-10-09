'use client'

import React, { useState } from 'react';
import Login from './layouts/login';
import Register from './layouts/register';
import { useAuth } from '../hooks/useAuth';

function Auth() {
  const [isHaveAccount, setIsHaveAccount] = useState<boolean>(true);
  const {loading, user} = useAuth()

  return loading ? <p>Loading...</p> : (
    <div className='w-screen h-screen flex justify-center items-center'>
      {user?.email ? 
      <div>
        <h2>Привіт! {user.email} Ти вже знаходишся на своєму аккаунті</h2>
      </div> 
      : 
      <div className='w-[90%] sm:w-[375px] h-auto rounded-xl bg-slate-500 pb-5'>
        {isHaveAccount ? <Login isAccount={setIsHaveAccount} /> : <Register isAccount={setIsHaveAccount} />}
      </div>
      }
    </div>
  );
}

export default Auth;
