import { UserType } from "@/lib/utils/types/user";
import {  useState } from "react";
import ConvoInput from "./convoInput";
import OtherBtns from "./otherBtns";
import SendMsg from "./sendMsg";
import MediaType from "@/shared/others/mediaType";
import { RxCross2 } from "react-icons/rx";

interface Props {
    mouseEntered:boolean;
    user:UserType;
    otherId:string;
    convoId:string;
    status:string|null;
    statusBy:string|null
}

type ContentType = {
    text:string;
    medias:{
        id:string;
        url:string;
        type:"audio"|"image"|"video";  
        file:File  
    }[];
  
}

export default function ConvoFooter({mouseEntered,user,otherId,convoId,status,statusBy}:Props) {
    
    const [content,setContent] = useState<ContentType>({
        text:"",
        medias:[]
    })
    const [input,setInput] = useState<string>("")
    const {text,medias} = content

    const handleRemoveMedia = (id:string) => {
        setContent(prev => {

            return {...prev,medias:prev.medias.filter(media=>media.id!==id)}
        })
    }
    const handleSent = () => {
        setInput("")
        setContent({
            text:"",
            medias:[]
        })
    }
    return (
        <>
            {medias.length>0
            &&
            <div className="h-[120px] p-2   max-h-[200px]">
                <div className="rounded-xl border h-full p-2 overflow-y-auto custom-scrollbar flex flex-wrap gap-3 relative">
                    {medias.map((med,index) => {
                        const {type,url,id} = med
                        return (
                            <div key={index} className="w-[80px] h-[80px] rounded-lg border-2 relative">
                                <MediaType
                                    media={url}
                                    type={type}
                                    className="w-full h-full rounded-lg object-cover"/>

                                <div className="absolute text-xl p-1 rounded-full bg-accent text-white cursor-pointer hover-opacity active:scale-90 right-1 top-1" onClick={() => handleRemoveMedia(id)}>
                                    <RxCross2 />
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            }

            <div className={`p-2 flex items-center border-t text-2xl ${mouseEntered ? "text-blue-500":"text-black/30"} justify-end`}>
                <OtherBtns 
                text={text} 
                medias={medias}
                setContent={setContent}/>
                <ConvoInput
                input={input}
                setInput={setInput} 
                content={content.text}
                setContent={setContent}/>
                <SendMsg 
                content={content}
                convoId={convoId}
                userId={user.id}
                otherId={otherId}
                handleSent={handleSent}
                status={{
                    stat:status,
                    by:statusBy
                }}/>
            
            </div>
        </>
    )
}