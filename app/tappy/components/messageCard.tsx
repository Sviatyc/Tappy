import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { toggleLike } from '@/app/api/toggleLike';
import { auth } from '@/app/firebase/firebase';

type Props = {
  likedBy: string[];
  message: string;
  username: string;
  messageId: string;
};

function MessageCard({ likedBy, message, username, messageId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLikedByCurrentUser = likedBy.includes(auth.currentUser?.uid || '');

  // Максимальна кількість символів, після яких текст буде обрезаний
  const maxCharacters = 50; // Ви можете змінити це значення

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='w-[300px] h-auto rounded-lg flex flex-col justify-between bg-gray-200 border-2 border-pink-200 py-1 px-3'>
      <div>
        <p className='font-bold mt-1'>{username}</p>
        <div className='bg-slate-100 rounded-md p-1 mt-2'>
          <span className='text-start w-full text-wrap break-words'>
            {isExpanded ? message : message.length > maxCharacters ? `${message.slice(0, maxCharacters)}...` : message}
          </span>
          {message.length > maxCharacters && (
            <span 
              className='text-blue-500 cursor-pointer' 
              onClick={handleToggleExpand}
            >
              <br />
              {isExpanded ? ('Show less') : 'Show more'}
            </span>
          )}
        </div>
      </div>
      <div className='mt-2 flex justify-end gap-[6px] items-end h-auto'>
        <span className='font-semibold text-gray-700 cursor-default'>{likedBy.length}</span>
        <Heart 
          className='w-[20px] text-gray-700 cursor-pointer' 
          fill={isLikedByCurrentUser ? 'red' : "white"} 
          onClick={() => toggleLike(messageId)}
        />
      </div>
    </div>
  );
}

export default MessageCard;
