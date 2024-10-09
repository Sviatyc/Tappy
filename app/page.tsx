'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function Main() {
  const router = useRouter()
  return (
    <div className='px-5 md:px-20 w-screen h-screen'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold text-center mt-10'>Вас вітає <br className='sm:hidden'/> <span className='text-orange-600'>Sence Triad</span>!</h1>
        <h2 className='text-2x text-center font-semibold mt-1'>Тут ми починаємо наш спільний проект Tappy, в якому участь зможе взяти кожен!</h2>
        <div className='flex flex-col gap-1 items-start mt-10 w-full'>
          <h3 className='text-3xl font-bold text-purple-600'>Запропонуй свою ідею: </h3>
          <p className='text-1xl font-semibold text-purple-500'>Я регулярно оновлюватиму сайт новими функціями та контентом. Ти зможеш бачити всі новини та зміни.</p> 
          <h3 className='text-3xl font-bold text-yellow-600 mt-5'>Слідкуй за змінами:</h3>
          <p className='text-1xl font-semibold text-yellow-500'>Маєш круту ідею? Поділися нею через форму на сайті, і, можливо, саме твоя пропозиція буде наступним оновленням!</p>  
          <h3 className='text-3xl font-bold text-blue-600 mt-5'>Бери участь у розвитку: </h3>
          <p className='text-1xl font-semibold text-blue-500'>Це наш спільний проект, і я хочу почути твою думку.</p>   
        </div>
        <button className='w-[70vw] sm:w-[25vw] h-[60px] rounded-md bg-pink-400 text-white font-bold mt-6 text-xl hover:bg-pink-500' onClick={()=>router.push('/tappy')}>Поділитись ідеєю</button>
      </div> 
    </div>
  )
}

export default Main