'use client'

import React from 'react'
import ProfileLayout from '../profile/layouts/ProlileLayout'
import MainLayout from '../../tappy/layouts/MainLayout'
import { useAuth } from '@/app/hooks/useAuth'
function UserProfile() {
  const {loading} = useAuth()

  if(loading) return <p>Loading...</p>
  return (
    <MainLayout>
        <div className='w-screen h-screen bg-slate-200 flex justify-center'>
            <ProfileLayout visible={false}/>
        </div>
    </MainLayout>
  )
}

export default UserProfile