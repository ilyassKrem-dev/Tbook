import { PostMediaType } from "@/lib/utils/types/post";
import { useState } from "react";
import PostMedias from "./postMedias";


export default function PostContent({content,medias}:{
    content:string;
    medias:PostMediaType[]
}) {
    const [showMore ,setShowMore] = useState<boolean>(false)
    const reg = /@\w+\b/
    const remplacedContent = content.replace(reg,(match:any) => {
        const username = match.split('@')[1]
        return `<a href="/profile/${username}" class=" text-blue-400 underline hover-opacity">${match}</a>`
        
    })
    const text = remplacedContent && (remplacedContent.length > 299 ? remplacedContent.slice(0,300) +"..." : remplacedContent)
   
    return (
        <>
            <div className="flex gap-4 items-start flex-col  font-medium mt-4 ">
                <div className="break-words  flex-col flex px-6">
                    {content&&<div dangerouslySetInnerHTML={{__html:!showMore?text:remplacedContent}}>
                        
                    </div>}
                    {content&&content.length > 110&&<div className=" self-end text-blue-500 underline text-sm hover-opacity cursor-pointer" onClick={() => setShowMore(prev => !prev)}>
                        {showMore ?"Show less" :"Show more..."}
                    </div>}
                </div>
                {medias.length>0&&<PostMedias medias={medias}/>}
            </div>
        </>
    )
}