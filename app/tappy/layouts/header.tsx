import { auth } from '@/app/firebase/firebase'
import { signOut } from 'firebase/auth'
import React from 'react'

type Props = {
    username: string
}

function Header({username}: Props) {
  return (
    <header className='w-full h-[60px] flex justify-between items-center border-b-[1px] border-white px-20'>
        <p className='bg-gray-500 py-1 px-2 rounded-md'>{username}</p>
        <button className='border-[1px] border-red-500 p-1 rounded-md hover:bg-red-500' onClick={()=>signOut(auth)}>sign out</button>
    </header>
  )
}

export default Header