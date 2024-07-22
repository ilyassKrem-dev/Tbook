import { CommentType } from "@/lib/utils/types/post"
import CommentTemplate from "../commentTemplate"
import { UserType } from "@/lib/utils/types/user";



export default function CommentReplies({replies,user}:{
    replies:CommentType[];
    user:UserType
}) {

  
    return (
        <div className="flex flex-col gap-1">
            {replies.map((replie,index) => {
                return (
                <CommentTemplate 
                    key={index} 
                    comment={replie}
                    userInfo={user}
                    isReply={true}
                    />
                )
            })}
        </div>
    )
} 