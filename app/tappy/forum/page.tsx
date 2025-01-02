'use client'

import React from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import AddMessage from './components/addMessage'
import AllMessages from './layouts/allMessages'

function Tappy() {
  const {loading} = useAuth()

  if(loading) return <p className='text-center'>Loading...</p>
  return(
    <main className='relative w-screen h-screen'>
      <div className='px-10 sm:px-20'>
        <AllMessages />
        <AddMessage />
      </div>
    </main>
  )
}

export default Tappy