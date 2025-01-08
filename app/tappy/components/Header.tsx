'use client'

import { auth } from '@/app/firebase/firebase'
import { signOut } from 'firebase/auth'
import { LogOut } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import Image from 'next/image'
import noImage from '@/public/assets/noImage.jpg'

type Props = {
  formattedDate: string
}

function Header({formattedDate}: Props) {
  const router = useRouter();
  const {loading} = useCurrentUser()

  const user = useSelector((state: RootState) => state.user.user); 
  if(loading){
    return <p>Loading...</p>
  }
  return (
    <header className="w-full h-[60px] flex flex-col justify-between mb-7 items-center px-10 mt-3 sm:px-20">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <p>Привіт, {user?.username}</p>
          <p className="text-[9px] text-gray-400">{formattedDate}</p>
        </div>
        <div className="flex items-center group relative w-10 h-10">
          <Image
            src={user?.image ? user.image : noImage}
            alt="user image"
            width={70}
            height={70}
            className="rounded-[10px] absolute z-10 w-10 h-10 right-0 bg-slate-100 cursor-pointer object-cover"
            onClick={() => router.push('/tappy/user/profile')}
          />
          <button
            className="border-[1px] border-red-500 p-1 rounded-full w-6 h-6 flex items-center justify-center absolute right-[-30px] hover:bg-red-500 sm:right-0 sm:group-hover:right-[-20px]"
            onClick={() => signOut(auth)}
          >
            <LogOut />
          </button>
        </div>
      </div>
      <nav className="w-full mt-2 border-t-[1px] border-gray-300 text-gray-500 bg-inherit text-sm">
        <div className='w-full mt-2 flex justify-center gap-6 items-center'>
            <p onClick={() => router.push('/tappy')} className='cursor-pointer'>Головна</p>
            <p onClick={() => router.push('/tappy/user/profile')} className='cursor-pointer'>Профіль</p>
            <p onClick={() => router.push('/tappy/forum')} className='cursor-pointer'>Форум</p>
        </div>
      </nav>
    </header>
  );
}

export default Header;
