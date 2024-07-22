import { UserType } from "@/lib/utils/types/user"

import AddComment from "./footer/addComment";
import { SetStateAction } from "react";
import { FCommentType } from "@/lib/utils/types/post";
import PostComment from "./footer/postComment";

export default function PostFooter({user,postId,comment,setComment,setShow}:{
    user:UserType | null;
    postId:string;
    comment:FCommentType| null
    setComment:React.Dispatch<SetStateAction<FCommentType|null>>;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
   
    return (
        <>
            {comment&&<PostComment
            comment={comment}
            user={user as UserType}
            setShow={setShow}
            />}
            {user&&
                <AddComment 
                userId={user.id}
                userName={user.name}
                userImage={user.image}
                postId={postId}
                setComment={setComment}/>
            }
        </>
    )
}