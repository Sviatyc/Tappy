'use client'

import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '@/app/hooks/useAuth'
function Game() {
  const {loading} = useAuth()

  if(loading) return <p>Loading...</p>
  return (
    <MainLayout>
        <div className='sm:text-5xl text-purple-600 text-center font-bold mt-10'>Триває розробка...</div>
    </MainLayout>
  )
}

export default Game