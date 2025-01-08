'use client'

import React from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import AddMessage from './components/addMessage'
import AllMessages from './layouts/allMessages'
import Loading from '@/app/components/ui/Loading'

function Tappy() {
  const {loading} = useAuth()

  if(loading) return <Loading />
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