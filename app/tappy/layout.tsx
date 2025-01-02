import React from 'react'
import Header from '@/app/tappy/components/Header'


function MainLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
    const formattedDate = new Date().toLocaleDateString('uk-UA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  return (
    <div>
      <Header formattedDate={formattedDate}/>
      {children}
    </div>
  )
}

export default MainLayout