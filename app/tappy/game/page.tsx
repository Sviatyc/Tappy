'use client'

import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '@/app/hooks/useAuth'
import GameCanva from './layouts/GameCanva'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
function Game() {
  const {loading} = useAuth()
  const {user} = useCurrentUser()

  if(loading) return <p>Loading...</p>
  return (
    <MainLayout>
        <div className='w-screen h-screen flex justify-center md:items-center'>
          {
            user?.chiken ? <p>hey</p> : <GameCanva />
          }
        </div>
    </MainLayout>
  )
}

export default Game