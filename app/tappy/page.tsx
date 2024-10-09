'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import Header from './layouts/header'
import {useCurrentUser} from '@/app/hooks/useCurrentUser'


function Tappy() {
  const router = useRouter()
  const {user, loading, error} = useCurrentUser()
  useEffect(() => {
    if (user) {
      router.push('/auth');
    }
  }, [router]);
  if(loading) return <p className='text-center'>Loading...</p>
  return(
    <div>
      <Header username={String(user?.username)}/>
    </div>
  )
}

export default Tappy