'use client'

import React from 'react'
import Header from './layouts/header'
import {useCurrentUser} from '@/app/hooks/useCurrentUser'
import { useAuth } from '../hooks/useAuth'
import AddMessage from './components/addMessage'
import AllMessages from './layouts/allMessages'

function Tappy() {
  const {user} = useCurrentUser()
  const {loading} = useAuth()

  if(loading) return <p className='text-center'>Loading...</p>
  return(
    <main className='relative w-screen h-screen'>
      <Header username={String(user?.username)}/>
      <div className='px-20'>
        <AllMessages />
        <AddMessage />
      </div>
    </main>
  )
}

export default Tappy