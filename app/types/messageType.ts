import { IcommentType } from "./commentType"

export interface IMessage {
    id: string
    sender: string
    message: string
    likedBy: [string]
    timestamp: string
    username?: string | undefined
    comments?: IcommentType[]
}