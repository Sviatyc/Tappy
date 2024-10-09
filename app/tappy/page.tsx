'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from './layouts/header'
import {useCurrentUser} from '@/app/hooks/useCurrentUser'


function Tappy() {
  const router = useRouter()
  const {user, loading} = useCurrentUser()
  useEffect(() => {
    if (user) {
      router.push('/auth');
    }
  }, [router, user]);
  if(loading) return <p className='text-center'>Loading...</p>
  return(
    <div>
      <Header username={String(user?.username)}/>
    </div>
  )
}

export default Tappy