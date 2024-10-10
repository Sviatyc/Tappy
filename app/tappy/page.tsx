'use client'
import React from 'react'
import MainLayout from './layouts/MainLayout'
import NavigateCard from './components/NavigateCard'
import { useAuth } from '../hooks/useAuth'

function Tappy() {
    const {loading} = useAuth()

    if(loading) return <p className='text-center'>Loading...</p>
  return (
    <MainLayout>
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-[85%] sm:w-[70%] flex flex-wrap justify-between gap-2'>
                <NavigateCard nav='/tappy/forum' text='Форум' className='bg-purple-600 sm:w-[49%] w-[100%]'/>
                <NavigateCard nav='/tappy/game' text='Потапати' className='bg-green-600 sm:w-[49%] w-[100%]'/>
                <NavigateCard nav='/user/profile' text='Профіль' className='bg-red-500 w-[100%]'/>
            </div>
        </div>
    </MainLayout>
  )
}

export default Tappy