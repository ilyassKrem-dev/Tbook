import Link from "next/link"
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { changeContentToLinks } from "@/lib/utils/textUtils";


export default function CommentContent({name,userName,content,likes}:{
    name:string;
    userName:string;
    content:string;
    likes:number
}) {
    const [showMore ,setShowMore] = useState<boolean>(false)
    const remplacedContent = changeContentToLinks(content)
    const text = remplacedContent && (remplacedContent.length > 149 ? remplacedContent.slice(0,150) +"..." : remplacedContent)
    return (
        <div className="bg-gray-500/10 flex flex-col rounded-xl p-2  flex-1 relative max-w-[300px] sm:max-w-[350px] md:max-w-[400px] w-fit">
            <Link href={`/profile/${userName}`} 
            className="font-bold capitalize text-sm hover-opacity">{name}</Link>
            <div className="flex flex-col w-full gap-1">
                <div dangerouslySetInnerHTML={{__html:showMore?text:remplacedContent}} className=" font-noto font-medium break-words">
                    
                </div>
                {remplacedContent.length > 149&&<p onClick={() => setShowMore(prev=>!prev)} className="text-sm text-blue-400 underline self-end cursor-pointer hover-opacity">{showMore?"Show less.":"Show More..."}</p>}
            </div>
            {likes>0&&<div className={`absolute -right-3 -bottom-1 bg-white flex text-xs items-center gap-1 sm-shadow rounded-full ${likes >1?"pr-1":""}`}>
                <div className="bg-blue-500 rounded-full p-1 flex">
                    <BiSolidLike className="text-white text-sm"/>
                </div>
                {likes>1&&<p>{likes}</p>}
            </div>}
        </div>
    )
}