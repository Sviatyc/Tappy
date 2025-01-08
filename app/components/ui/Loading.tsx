import React from 'react'

function Loading() {
  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100px] h-[100px] z-50'>
        <span className='w-[80px] h-[80px] rounded-full flex justify-center items-center bg-white overflow-hidden relative'>
            <span className='w-[10px] loading h-[90px] absolute  bg-gray-500 '></span>
            <span className='w-[70px] h-[70px] rounded-full bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '></span>
        </span>
    </div>
  )
}

export default Loading