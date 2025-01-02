'use client'

import ProfileLayout from './layouts/ProlileLayout'
import React from 'react'
import { useAuth } from '@/app/hooks/useAuth'

function Profile() {
  const {loading} = useAuth()

  if(loading) return <p>Loading...</p>
  return (
    <div className='flex justify-center w-full h-full'>
      <ProfileLayout visible={true}/>
    </div>
  )
}

export default Profile