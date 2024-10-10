'use client'
import React from 'react'
import Header from '@/app/tappy/components/Header'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'


function MainLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  const {user} = useCurrentUser()
  return (
    <div>
      <Header username={String(user?.username)}/>
      {children}
    </div>
  )
}

export default MainLayout