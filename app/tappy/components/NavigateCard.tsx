'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    text: string
    nav: string
    className: string
}

function NavigateCard({text, nav, className}: Props) {
    const router = useRouter()
  return (
    <div className={`h-[145px] sm:h-[170px] text-white cursor-pointer hover:opacity-85 font-bold text-4xl md:text-5xl uppercase text-center flex items-center justify-center rounded-xl ${className}`} onClick={()=>router.push(nav)}>{text}</div>
  )
}

export default NavigateCard