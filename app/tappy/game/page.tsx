'use client'

import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '@/app/hooks/useAuth'

function Game() {
  const { loading } = useAuth();
  const text = 'Ромашки це квіти які символізують простоту та чистоту вони ростуть в різних місцях від лугів до лісових галявин приносячи радість кожному хто їх бачить білі пелюстки ромашок контрастують з жовтими серцевинами створюючи враження невимушеної краси у народі існує безліч повірїв про ці квіти їх вважають символом невинності і чистої любові а також дарують на знак вдячності ромашки часто використовують у народній медицині виготовляючи відвари для заспокоєння їх легкий аромат і ніжний вигляд не можуть не захоплювати зустріч з ромашками на природі завжди дарує відчуття спокою і гармонії'
  const [userInput, setUserInput] = useState('');
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [remainingText, setRemainingText] = useState(text);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (started && !timer) {
      const newTimer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setTimer(newTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer); 
      }
    };
  }, [started, timer]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!started || finished) return;

      const nextChar = remainingText.charAt(0);
      if (e.key === nextChar) {
        setRemainingText(prev => prev.slice(1));
        setUserInput(prev => prev + e.key);
      } else {
        setTime(prevTime => prevTime + 0.5); 
      }

      if (remainingText.length === 1) {
        setFinished(true);
        if (timer) {
          clearInterval(timer);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    }
  }, [started, remainingText, timer, finished]);

  const handleStart = () => {
    setStarted(true);
    setFinished(false);
  };

  const handleRestart = () => {
    setUserInput('');
    setTime(0);
    setStarted(false);
    setRemainingText(text);
    setFinished(false);
    if (timer) {
      clearInterval(timer);
    }
    setTimer(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <MainLayout>
      <div className="sm:text-5xl text-purple-600 text-center font-bold mt-10">
        <h1>Demo game</h1>
      </div>
      <div className="text-center mt-6 px-10 w-[70%] flex justify-center m-auto">
        <p className="text-xl mb-4 text-[1vw]">
          <span className="transition-all duration-300">{remainingText}</span>
        </p>
      </div>
      <div className="text-center mt-4">
        {!started ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Почати гру
          </button>
        ) : (
          <>
            <p>Час: {Math.floor(time)} сек.</p>
            <button
              onClick={handleRestart}
              className="px-4 py-2 mt-4 bg-red-500 text-white rounded"
            >
              Перезапустити гру
            </button>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Game;
