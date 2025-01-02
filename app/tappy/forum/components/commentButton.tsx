import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle, SendHorizontal } from "lucide-react";
import { commentType } from "@/app/types/commentType";
import { getUserById } from "@/app/api/getUserById";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { addComment } from "@/app/api/addComment";
import { auth } from "@/app/firebase/firebase";
import { IUser } from "@/app/types/userType";

type Props = {
  message: string;
  username: string;
  comments: commentType[];
  likedBy: string[];
  messageId: string;
};

function CommentButton({ message, username, comments, likedBy, messageId }: Props) {
  const [commentUser, setCommentUser] = useState<IUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommentUsers = async () => {
      try {
        const userPromises = comments.map((e) => getUserById(e.senderId));
        const info = await Promise.all(userPromises) as IUser[]; // Явне приведення типу
        setCommentUser(info);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCommentUsers();
  }, [comments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      await addComment(messageId, newComment, user.uid);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <MessageCircle
          className="w-4 sm:w-5 text-gray-600 sm:text-gray-700 cursor-pointer"
          fill="white"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-sm">
        <DialogTitle>
          <p className="font-bold mt-1 text-[14px] sm:text-[16px] cursor-pointer">{username}</p>
          <div className="bg-slate-100 rounded-[3px] mt-1 sm:rounded-md p-1 text-[12px] sm:text-[15px]">
            <p className="text-start w-full text-wrap mt-1 leading-4 tracking-[0.015rem] font-medium">
              {message}
            </p>
          </div>
        </DialogTitle>
        <CommentCard
          comments={comments}
          commentUser={commentUser}
          messageId={messageId}
          likedBy={likedBy}
        />
        <div className="w-full relative h-11 flex flex-row items-center">
          <Input
            className="mt-2 border-0 shadow-none pl-0 pr-10 focus-visible:ring-0"
            type="text"
            placeholder="Ваше повідомлення"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SendHorizontal
            className="absolute right-0 top-[14px] cursor-pointer"
            onClick={handleAddComment}
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}

export default CommentButton;
