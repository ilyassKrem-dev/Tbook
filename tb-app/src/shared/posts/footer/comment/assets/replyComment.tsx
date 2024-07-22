import { SetStateAction } from "react";
import AddComment from "../../addComment";
import { CommentType } from "@/lib/utils/types/post";
import { UserType } from "@/lib/utils/types/user";



export default function ReplyComment({user,commentId,postId,setComments}:{
    user:UserType;
    commentId:string;
    postId:string;
    setComments?:React.Dispatch<SetStateAction<CommentType[]>>;
}) {
    return (
        <div className="w-full">
            <AddComment 
            userId={user.id}
            userImage={user.image}
            userName={user.name} 
            setComments={setComments}
            postId={postId}
            commentId={commentId}
            isReply={true}
            />
        </div>
    )
}