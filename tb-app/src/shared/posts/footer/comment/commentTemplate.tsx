
import { getDayOfComment } from "@/lib/utils/simpleUtils"
import { CommentType } from "@/lib/utils/types/post"
import Link from "next/link"
import { useState } from "react"
import LikeComment from "./likeComment"
import { BiSolidLike } from "react-icons/bi";

export default function CommentTemplate({comment,userId}:{
    comment:CommentType;
    userId:string
}) {
    const {user,content} = comment
    const [likes,setLikes] = useState<number>(comment.likes)
    const [showMore ,setShowMore] = useState<boolean>(false)
    const reg = /@\w+\b/
    const remplacedContent = content.replace(reg,(match:any) => {
        const username = match.split('@')[1]
        return `<a href="/profile/${username}" class=" text-blue-400 underline hover-opacity">${match}</a>`
        
    })
    const text = remplacedContent && (remplacedContent.length > 149 ? remplacedContent.slice(0,150) +"..." : remplacedContent)
    console.log(comment)
    const time = getDayOfComment(comment.created_at)
    return (
        <>
            <div className="flex gap-2">
                <Link href={`/profile/${user.username}`}  className="w-[32px] h-[32px] hover-opacity active:scale-90">
                    <img 
                    src={user.image ? user.image:"/profile.jpg"} 
                    alt={`${user.name} picture`}
                    className="w-full h-full rounded-full object-cover"/>
                </Link>
                <div className="flex flex-col">
                    <div className="bg-gray-500/10 flex flex-col rounded-xl p-2 max-[350px]:max-w-[250px] flex-1 relative">
                        <Link href={`/profile/${user.username}`} 
                        className="font-bold capitalize text-sm hover-opacity">{user.name}</Link>
                        <div className="flex flex-col w-full gap-1">
                            <div dangerouslySetInnerHTML={{__html:showMore?text:remplacedContent}} className=" font-noto font-medium break-words">
                                
                            </div>
                            {remplacedContent.length > 149&&<p onClick={() => setShowMore(prev=>!prev)} className="text-sm text-blue-400 underline self-end cursor-pointer hover-opacity">{showMore?"Show less.":"Show More..."}</p>}
                        </div>
                        {likes>0&&<div className={`absolute -right-4 -bottom-3 bg-white flex text-xs items-center gap-1 sm-shadow rounded-full ${likes >1?"pr-1":""}`}>
                            <div className="bg-blue-500 rounded-full p-1 flex">
                                <BiSolidLike className="text-white text-sm"/>
                            </div>
                            {likes>1&&<p>{likes}</p>}
                        </div>}
                    </div>
                    <div className="flex pl-3 text-sm  font-semibold gap-2 items-center text-gray-400">
                        <p className="text-xs">{time}</p>
                        <LikeComment 
                        setLikes={setLikes}
                        comment_id={comment.id}
                        userId={userId}/>
                        <div className="text-gray-600 hover:underline transition-all duration-300 cursor-pointer">
                            Reply
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}