import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import MessageCard from '../components/messageCard'; 
import { useSubscribeToMessages } from '@/app/hooks/useSubscribeToMessages';

function AllMessages() {
  useSubscribeToMessages(); 
  const messages = useSelector((state: RootState) => state.messages.messages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (messages) {
      setLoading(false); 
    }
  }, [messages]);

  return (
    <section className='flex justify-center sm:justify-start gap-1 flex-wrap mt-5'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        messages?.map(message => (
          <MessageCard 
            key={message.id} 
            message={message.message} 
            likedBy={message.likedBy}
            messageId={message.id}
            username={message.username || 'Unknown User'} 
            sender={message.sender}
            comments={message.comments || []}
          />
        ))
      )}
    </section>
  );
}

export default AllMessages;
