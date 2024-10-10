'use client'
import React from 'react'
import Header from '@/app/tappy/components/Header'


function MainLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default MainLayout