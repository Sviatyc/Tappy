import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase/firebase'
import {IcommentType} from '@/app/types/commentType'

export const toggleLikeComment = async (messageId: string, commentId: string) => {
    try {
        const user = auth.currentUser
        if (!user) throw new Error('User not authenticated')

        const docRef = doc(db, 'messages', messageId)

        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) throw new Error('Document does not exist')

        const data = docSnap.data()
        const comments = data?.comments || []

        const commentIndex = comments.findIndex((comment: IcommentType) => comment.commentId === commentId)
        if (commentIndex === -1) throw new Error('Comment not found')

        const comment = comments[commentIndex]
        const likedBy = comment.likedBy || []

        const isLiked = likedBy.includes(user.uid)

        const updatedComment = {
            ...comment,
            likedBy: isLiked ? likedBy.filter((uid: string) => uid !== user.uid) : [...likedBy, user.uid]
        }

        comments[commentIndex] = updatedComment

        await updateDoc(docRef, {
            comments: comments
        })
    } catch (error) {
        console.error('Error updating like:', error)
        throw error
    }
}
