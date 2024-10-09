'use client'

import React from 'react'
import Header from './layouts/header'
import {useCurrentUser} from '@/app/hooks/useCurrentUser'
import { useAuth } from '../hooks/useAuth'

function Tappy() {
  const {user} = useCurrentUser()
  const {loading} = useAuth()

  if(loading) return <p className='text-center'>Loading...</p>
  return(
    <div>
      <Header username={String(user?.username)}/>
    </div>
  )
}

export default Tappy