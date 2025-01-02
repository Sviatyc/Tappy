import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { commentType } from '../types/commentType'


export const addComment = async (messageId: string, commentText: string, senderId: string) => {
  try {
    const docRef = doc(db, 'messages', messageId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) throw new Error('Message not found')

    const data = docSnap.data()
    const comments: commentType[] = data?.comments || []

    const newComment: commentType = {
      commentId: new Date().getTime().toString(), 
      comment: commentText,
      likedBy: [],
      senderId,
    }

    comments.push(newComment)

    await updateDoc(docRef, {
      comments
    })
  } catch (err) {
    console.error('Error adding comment:', err)
    throw new Error('Failed to add comment.')
  }
}
