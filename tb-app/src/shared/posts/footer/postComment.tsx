import { FCommentType } from "@/lib/utils/types/post"
import CommentTemplate from "./comment/commentTemplate"

export default function PostComment({comment,userId}:{
    comment:FCommentType;
    userId:string;

}) {  
    return (
        <>
            <div className="p-2 px-4">
                {comment.more&&<div className=" text-black/60 text-sm font-bold cursor-pointer hover:underline hover-opacity">
                    View more comments
                </div>}
                <div className="flex mt-2">
                    <CommentTemplate comment={comment} userId={userId}/>
                </div>
            </div>
            
        </>
    )
}