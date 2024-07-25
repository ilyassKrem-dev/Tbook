
import { getDayOfComment } from "@/lib/utils/simpleUtils"
import { CommentType } from "@/lib/utils/types/post"
import Link from "next/link"
import { SetStateAction, useState } from "react"
import LikeComment from "./assets/likeComment"
import ReplyComment from "./assets/replyComment"
import { UserType } from "@/lib/utils/types/user"
import CommentContent from "./assets/commentContent"
import CommentReplies from "./assets/replies"
import { FaArrowTurnUp } from "react-icons/fa6";

export default function CommentTemplate({comment,userInfo,setComments,replies,isReply}:{
    comment:CommentType;
    userInfo:UserType|null;
    setComments?:React.Dispatch<SetStateAction<CommentType[]>>;
    replies?:CommentType[]
    isReply?:boolean
}) {

    const {user,content} = comment
    const [showReply,setShowReply] = useState<boolean>(false)
    const [showReplies,setShowReplies] = useState<boolean>(false)
    const [likes,setLikes] = useState<number>(comment.likes)
    const time = getDayOfComment(comment.created_at)
    
    return (
        <>
            <div className="flex gap-2">
                
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-[32px] h-[32px]">
                        {isReply&&<div className="absolute -left-6 -top-5 z-10">
                                <div className="h-10 w-[20px] rounded-bl-lg border-b-2 border-gray-500/50 bg-transparent" />
                        </div>}
                        <Link href={`/profile/${user.username}`}  className="w-[32px] h-[32px] hover-opacity active:scale-90">
                            <img 
                            src={user.image ? user.image:"/profile.jpg"} 
                            alt={`${user.name} picture`}
                            className="w-full h-full rounded-full object-cover border bg-white"/>
                        </Link>

                    </div>
                    {replies&&<div className="w-px bg-gray-500/40 h-full relative z-20">
                    </div>}

                </div>
                <div className="flex flex-col w-full">
                    <CommentContent 
                    name={user.name}
                    content={content}
                    likes={likes}
                    userName={user.username}/>
                    <div className="flex pl-3 text-sm  font-semibold gap-2 items-center text-gray-400">
                        <p className="text-xs">{time}</p>
                        <LikeComment 
                        setLikes={setLikes}
                        postId={comment.post_id}
                        comment_id={comment.id}
                        />
                        {!isReply&&<div className="text-gray-600 hover:underline transition-all duration-300 cursor-pointer" onClick={() => setShowReply(prev=> !prev)}>
                            Reply
                        </div>}
                        
                    </div>
                    {!showReplies&&replies&&replies?.length>0&&<div className="flex gap-1 items-center mt-1 px-2 text-gray-600/80 cursor-pointer font-semibold" onClick={() => setShowReplies(true)}>
                        <FaArrowTurnUp className="rotate-90"/>
                        <p className=" cursor-pointer">Show {replies?.length} {replies.length != 1 ? "replies":"reply"}</p>
                    </div>}
                    
                    {showReplies&&replies && replies?.length>0&&
                    <div className="w-full mt-2">
                        <CommentReplies 
                        replies={replies}
                        user={user as UserType}/>
                    </div>}

                    {showReply&&userInfo&&<div className="w-full relative mr-5">
                        <div className="absolute -left-6 top-0 z-10">
                                <div className="h-10 w-[30px] rounded-bl-lg border-b-2 border-gray-500/50 bg-transparent" />
                        </div>
                        <ReplyComment 
                            user={user as UserType}
                            postId={comment.post_id}
                            commentId={comment.id}
                            setComments={setComments}
                            />

                    </div>}
                </div>
                
            </div>
        </>
    )
}