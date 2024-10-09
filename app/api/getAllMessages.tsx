import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import { IMessage } from "../types/messageType";

export const subscribeToMessages = (callback: (messages: IMessage[]) => void) => {
    const messagesRef = collection(db, 'messages');

    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as IMessage[];

        callback(messages);
    });

    return unsubscribe;
};
