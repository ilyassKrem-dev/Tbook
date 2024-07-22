import Comments from "@/lib/classes/Comments"
import { CommentType } from "@/lib/utils/types/post"
import { useEffect, useState } from "react"
import CommentTemplate from "./commentTemplate"
import { UserType } from "@/lib/utils/types/user";



export default function AllComments({postId,user}:{
    postId:string;
    user:UserType
}) {
    const [comments,setComments] = useState<CommentType[]>([])
    useEffect(() => {
        const fetchComments = async() => {
            const res = await Comments.getCommments(postId)
            if(res?.success) {
                setComments(res.data)
            }
        }
        fetchComments()
    },[postId])

    return (
        <div className="flex flex-col gap-1 p-4">
            {comments.length>0&&
            comments.map((comment,index) => {
                if(comment.parent_id) return
                return (
                        <CommentTemplate 
                        key={index} 
                        comment={comment}
                        userInfo={user}
                        setComments={setComments}
                        replies={comments.filter((comment) => comment.parent_id !== null)}
                        />

                )
            })}
        </div>
    )
}