import { changeContentToLinks } from "@/lib/utils/textUtils"
import { StoryType } from "@/lib/utils/types/storyType"




export default function StoryShow({story}:{
    story:StoryType
}) {
    const {type,media,text,bgColor,textColor,mediaClass} = story 
    const content = text ? changeContentToLinks(text) : ""
    const zoom = mediaClass ? mediaClass.split("|") : "50";
    const rotate = mediaClass ? mediaClass.split("|")[1] : ""
    return (
        <>
            {type=="text"&&
            <div className=" flex justify-center items-center h-full w-full group-hover:opacity-70 group-hover:scale-105 transition-all duration-300 rounded-md"
                style={{backgroundColor:bgColor}}>
                {text&&<p 
                className="max-w-[100px] text-center break-words font-bold cursor-pointer"
                style={{color:textColor}} 
                dangerouslySetInnerHTML={{__html:content}} />}
            </div>}
            {type=="photo"&&
            <div className="rounded-md">
                <div className="absolute flex justify-center items-center break-words max-w-[300px] text-center z-30 top-10  text-lg font-semibold cursor-pointer"
                style={{color:textColor}} dangerouslySetInnerHTML={{__html:content}} />
                {media&&<img 
                src={media} 
                alt="photo" 
                className={`h-full w-full rounded-md object-contain`}
                style={{
                    scale:(Number(zoom)+70)/100,
                    rotate:`${Number(rotate)}deg`
                }}/>}
            </div>}
        </>
    )
}