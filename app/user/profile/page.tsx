'use client'

import MainLayout from '@/app/tappy/layouts/MainLayout'
import ProfileLayout from './layouts/ProlileLayout'
import React from 'react'
import { useAuth } from '@/app/hooks/useAuth'
// import ProfileNav from './layouts/ProfileNav'

function Profile() {
  const {loading} = useAuth()

  if(loading) return <p>Loading...</p>
  return (
    <MainLayout>
      <div className='flex justify-center w-full h-full'>
        {/* <ProfileNav /> */}
        <ProfileLayout visible={true}/>
      </div>
    </MainLayout>
  )
}

export default Profile