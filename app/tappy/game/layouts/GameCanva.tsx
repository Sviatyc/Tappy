import React, { useState } from 'react';
import legendEgg from '@/app/assets/images/eggs/legendEgg/legengEgg.svg';
import eggShadow from '@/app/assets/images/eggs/eggShadow.svg';
import Image from 'next/image';

function GameCanva() {
  const [isJumping, setIsJumping] = useState(false);
  const [jumps, setJumps] = useState<number>(0);

  const handleJump = () => {
    setIsJumping(true);
    setJumps(j => j + 1);
    setTimeout(() => {
      setIsJumping(false);
    }, 400); 
  };

  return (
    <div className="w-[90%] h-[50%] md:h-[90%] bg-green-100 rounded-[20px] flex justify-center mt-[70px] md:mt-0 items-center border-2 border-black">
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        <Image
          width={200}
          height={200}
          src={legendEgg}
          alt="egg"
          className={`cursor-pointer ${isJumping ? 'jump' : ''} z-10 w-[200px] h-[200px] md:w-[200px] md:h-[400px]`}
          onClick={handleJump}
        />
        <div>
          <Image 
            width={200} 
            height={10} 
            src={eggShadow} 
            alt='shadow' 
            className={`absolute left-[50%] translate-x-[-50%] bottom-0 sm:bottom-[10px] md:bottom-[120px] lg:bottom-[80px] transition-all duration-300 ${isJumping ? 'scale-90 opacity-20' : 'scale-100 opacity-30'}`} 
          />
        </div>
      </div>
    </div>
  );
}

export default GameCanva;
