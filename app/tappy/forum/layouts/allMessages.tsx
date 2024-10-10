import React, { useEffect, useState } from 'react';
import { subscribeToMessages } from '@/app/api/getAllMessages';
import { getUserById } from '@/app/api/getUserById'; 
import MessageCard from '../components/messageCard'; 
import { IMessage } from '@/app/types/messageType';

function AllMessages() {
  const [messages, setMessages] = useState<IMessage[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToMessages(async (allMessages: IMessage[]) => {
      const messagesWithUsernames = await Promise.all(
        allMessages.map(async (message: IMessage) => {
          const user = await getUserById(message.sender);
          return {
            ...message,
            username: user.username || 'Unknown User', 
          };
        })
      );
      setMessages(messagesWithUsernames);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); 

  return (
    <section className='flex justify-center sm:justify-start gap-1 flex-wrap mt-5'>
      {loading ? (
        <p>Loading...</p> 
      ) : (
        messages.map(message => (
          <MessageCard 
            key={message.id} 
            message={message.message} 
            likedBy={message.likedBy}
            messageId={message.id}
            username={message.username || 'Unknown User'} 
            sender={message.sender}
          />
        ))
      )}
    </section>
  );
}

export default AllMessages;
