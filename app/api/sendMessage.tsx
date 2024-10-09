import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import generateUniqueId from "./generateRandomId";


function formatDateToUkrainian(date:Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return new Intl.DateTimeFormat('uk-UA', options).format(date);
}

export const sendMessage = async (message : string) => {
    try {
        const uniqId = generateUniqueId()
        const docRef = doc(db, 'messages', uniqId);
        const now = new Date();
        const formattedDate = formatDateToUkrainian(now); 

        await setDoc(docRef, {
            id: uniqId,
            message: message,
            sender: auth.currentUser?.uid,
            timestamp: formattedDate, 
            likedBy: []
        });

        console.log("Message sent successfully with timestamp:", formattedDate);
    } catch (e) {
        console.error("Error sending message: ", e);
    }
};

