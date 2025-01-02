'use client'

import React from 'react'
import ProfileLayout from '../profile/layouts/ProlileLayout'
import { useAuth } from '@/app/hooks/useAuth'
function UserProfile() {
  const {loading} = useAuth()

  if(loading) return <p>Loading...</p>
  return (
      <div className='w-screen h-screen bg-slate-200 flex justify-center'>
          <ProfileLayout visible={false}/>
      </div>
  )
}

export default UserProfile