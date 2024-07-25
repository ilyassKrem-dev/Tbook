import { FCommentType } from "@/lib/utils/types/post"
import CommentTemplate from "./comment/commentTemplate"
import { SetStateAction } from "react";
import { UserType } from "@/lib/utils/types/user";

export default function PostComment({comment,user,setShow}:{
    comment:FCommentType;
    user:UserType|null;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {  
    
    return (
        <>
            <div className="p-2 px-4">
                {comment.more&&<div className=" text-black/60 text-sm font-bold cursor-pointer hover:underline hover-opacity" onClick={() => setShow(true)}>
                    View more comments
                </div>}
                <div className="max-w-[600px] mt-2">
                    <CommentTemplate 
                    comment={comment} 
                    userInfo={user}
                    replies={comment.replies}
                    />
                </div>
            </div>
            
        </>
    )
}