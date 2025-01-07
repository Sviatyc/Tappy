import React from "react";
import { Heart } from "lucide-react";
import { IcommentType } from "@/app/types/commentType";
import { IUser } from "@/app/types/userType";
import { auth } from "@/app/firebase/firebase";
import { toggleLikeComment } from "@/app/api/toggleLikeComment";
import { useRouter } from "next/navigation";
import Image from "next/image";
type Props = {
  comments: IcommentType[];
  commentUser: IUser[];
  likedBy: string[];
  messageId: string;
};

function CommentCard({ comments, commentUser, messageId }: Props) {
  const router = useRouter();
  const isLikedByCurrentUser = comments.map((e) =>
    e.likedBy.includes(auth.currentUser?.uid || "")
  );
  console.log(comments);
  console.log(comments.map((e) => e.commentId));

  return (
    <div className="flex items-start flex-col">
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm text-center w-full mt-1">Ще немає коментарів</p>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {comments.map((elem, index) => (
            <div
              key={index}
              className="flex flex-row items-start mb-2 rounded-xl relative"
            >
              <div className="w-auto">
                {commentUser && commentUser[index] ? (
                  <Image
                    width={12}
                    height={12}
                    src={
                      commentUser[index].image ||
                      "https://imgcdn.stablediffusionweb.com/2024/6/7/09001582-ae8e-40c9-9334-d7716dd933bd.jpg"
                    }
                    alt="user profile"
                    className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                )}
              </div>
              <div className="flex flex-col ml-2">
                <p className="font-semibold text-[13px] cursor-pointer" onClick={()=>router.push(`/tappy/user/${commentUser[index].id}`)}>
                  {(commentUser && commentUser[index]?.username) ||
                    "Unknown User"}
                </p>
                <p className="text-[12px]">{elem.comment}</p>
                <div className="absolute bottom-0 right-0 flex items-center gap-1">
                  <Heart
                    className="w-4 h-4 text-gray-600 cursor-pointer"
                    fill={isLikedByCurrentUser[index] ? "#dc5133" : "white"}
                    onClick={() => toggleLikeComment(messageId, elem.commentId)}
                  />
                  <span className="text-[12px]">{elem.likedBy.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentCard;
