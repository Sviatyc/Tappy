'use client'

import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '@/app/hooks/useAuth'
import GameCanva from './layouts/GameCanva'
function Game() {
  const {loading} = useAuth()

  if(loading) return <p>Loading...</p>
  return (
    <MainLayout>
        <div className='w-screen h-screen flex justify-center md:items-center'>
          <GameCanva />
        </div>
    </MainLayout>
  )
}

export default Game