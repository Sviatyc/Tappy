import { updateDoc, doc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db, auth } from '../firebase/firebase'

export const toggleLike = async (messageId: string) => {
    try {
        const user = auth.currentUser
        if (!user) throw new Error('User not authenticated')

        const docRef = doc(db, 'messages', messageId)

        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) throw new Error('Document does not exist')

        const data = docSnap.data()
        const likedBy = data?.likedBy || []

        const isLiked = likedBy.includes(user.uid)

        await updateDoc(docRef, {
            likedBy: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
        })
    } catch (error) {
        console.error('Error updating like:', error)
        throw error
    }
}
