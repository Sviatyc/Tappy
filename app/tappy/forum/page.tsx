'use client'

import React from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import AddMessage from './components/addMessage'
import AllMessages from './layouts/allMessages'
import MainLayout from '../layouts/MainLayout'

function Tappy() {
  const {loading} = useAuth()

  if(loading) return <p className='text-center'>Loading...</p>
  return(
    <MainLayout>
      <main className='relative w-screen h-screen'>
        <div className='px-20'>
          <AllMessages />
          <AddMessage />
        </div>
      </main>
    </MainLayout>
  )
}

export default Tappy