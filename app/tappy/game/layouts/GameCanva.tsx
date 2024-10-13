import React, { useEffect, useState } from 'react';
import classicEgg from '@/app/assets/images/eggs/classicEgg/classicEgg.svg';
import classicEgg_b1 from '@/app/assets/images/eggs/classicEgg/classicEgg_b1.svg';
import classicEgg_b2 from '@/app/assets/images/eggs/classicEgg/classicEgg_b2.svg';
import classicEgg_b3 from '@/app/assets/images/eggs/classicEgg/classicEgg_b3.svg';
import chiken from '@/app/assets/images/chiken/chiken.svg';
import eggShadow from '@/app/assets/images/eggs/eggShadow.svg';
import { auth, db } from '@/app/firebase/firebase';
import {doc, updateDoc} from 'firebase/firestore'
import Image from 'next/image';

function GameCanva() {
  const [isJumping, setIsJumping] = useState(false);
  const [jumps, setJumps] = useState<number>(0);
  const eggImage = jumps >= 34 ? chiken :
                 jumps >= 23 ? classicEgg_b3 :
                 jumps >= 18 ? classicEgg_b2 :
                 jumps >= 10 ? classicEgg_b1 :
                 classicEgg;

  const handleJump = () => {
    setIsJumping(true);
    setJumps(j => j + 1);
    setTimeout(() => {
      setIsJumping(false);
    }, 400); 
  };

  useEffect(() => {
    if (jumps >= 34) {
      const docRef = doc(db, 'users', String(auth.currentUser?.uid));
      updateDoc(docRef, {
        chiken: 'original' 
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });
    }
  }, [jumps]);

  return (
    <div className="w-[90%] h-[50%] md:h-[90%] bg-green-100 rounded-[20px] flex justify-center mt-[70px] md:mt-0 items-center border-2 border-black">
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        <Image
          width={200}
          height={200}
          src={eggImage}
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
            className={`absolute left-[50%] translate-x-[-50%] ${jumps >= 34 ? 'hidden' : 'block'} bottom-0 sm:bottom-[10px] md:bottom-[120px] lg:bottom-[80px] transition-all duration-300 ${isJumping ? 'scale-90 opacity-20' : 'scale-100 opacity-30'}`} 
          />
        </div>
      </div>
    </div>
  );
}

export default GameCanva;



