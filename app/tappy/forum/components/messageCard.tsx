import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { toggleLike } from '@/app/api/toggleLike';
import { auth } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';

type Props = {
  likedBy: string[];
  message: string;
  username: string;
  messageId: string;
  sender: string
};

function MessageCard({ likedBy, message, username, messageId, sender }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastTap, setLastTap] = useState<number>(0);
  const isLikedByCurrentUser = likedBy.includes(auth.currentUser?.uid || '');
  const router = useRouter()

  const maxCharacters = 50; 

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDoubleClickOrTap = () => {
    const currentTime = Date.now();
    const tapGap = currentTime - lastTap;

    if (tapGap < 300 && tapGap > 0) { 
      toggleLike(messageId);
    }

    setLastTap(currentTime); 
  };

  return (
    <div 
      className='w-[130px] sm:w-[300px] h-[fit-content] rounded-[5px] sm:rounded-lg flex flex-col justify-between bg-gray-200 border-2 border-pink-200 py-1 px-3'
      onDoubleClick={handleDoubleClickOrTap} 
      onTouchEnd={handleDoubleClickOrTap} 
    >
      <div>
        <p className='font-bold mt-1 text-[12px] sm:text-[16px] cursor-pointer' onClick={()=>router.push(`/user/${sender}`)}>{username}</p>
        <div className='bg-slate-100 rounded-[3px] sm:rounded-md p-1 mt-[2px] sm:mt-2 text-[9px] sm:text-[14px]'>
          <span className='text-start w-full text-wrap break-words'>
            {isExpanded ? message : message.length > maxCharacters ? `${message.slice(0, maxCharacters)}...` : message}
          </span>
          {message.length > maxCharacters && (
            <span 
              className='text-blue-500 cursor-pointer' 
              onClick={handleToggleExpand}
            >
              <br />
              {isExpanded ? 'Show less' : 'Show more'}
            </span>
          )}
        </div>
      </div>
      <div className='mt-[2px] sm:mt-2 flex justify-end gap-[6px] items-center h-auto'>
        <span className='font-semibold text-gray-700 cursor-default text-[12px] sm:text-[16px]'>{likedBy.length}</span>
        <Heart 
          className='w-4 sm:w-5 text-gray-600 sm:text-gray-700 cursor-pointer' 
          fill={isLikedByCurrentUser ? 'red' : 'white'} 
          onClick={() => toggleLike(messageId)} 
        />
      </div>
    </div>
  );
}

export default MessageCard;
