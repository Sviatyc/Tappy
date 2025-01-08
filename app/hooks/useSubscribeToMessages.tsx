import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMessages } from '@/app/store/features/messageSlice';
import { subscribeToMessages } from '@/app/api/getAllMessages';
import { getUserById } from '@/app/api/getUserById';
import { IMessage } from '@/app/types/messageType';

export const useSubscribeToMessages = () => {
  const dispatch = useDispatch();

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
      dispatch(setMessages(messagesWithUsernames)); 
    });

    return () => unsubscribe(); 
  }, [dispatch]);
};
