
import { HiThumbUp } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { useEffect, useState } from "react";
import { useToast } from "@/assets/Wrappers/toastWrapper";
import Servers from "@/lib/classes/Servers";
import LoadingAnimation from "@/shared/spinner";
import openAi from "@/lib/openAi/openAi";
import Misc from "@/lib/classes/Misc";
import { UserType } from "@/lib/utils/types/user";
import { Zen_Antique } from "next/font/google";
type ContentType = {
    text:string;
    medias:{
        url:string;
        type:"audio"|"image"|"video";
        file:File
    }[]
}



export default function SendMsg({content,userId,otherId,convoId,handleSent,status,user}:{
    content:ContentType,
    userId:string;
    otherId:string;
    convoId:string;
    user:UserType;
    handleSent:() => void;
    status:{
        stat:string|null;
        by:string|null
    }
}) {
    const [progress,setProgress] = useState<number>(0)
    const {startUpload} = useUploadThing("media",{
        onUploadProgress:(p) => setProgress(p)
    })
    const [aiMsgs,setAiMsgs] = useState<any[]>([])
    const socketS = Servers.socketUrl
    const {text,medias} = content

    const check = text.length>0 || medias.length>0
    
    const {toast} = useToast()
    const {stat,by} = status
    const handleSend = async() => {
        if(text.length===0 && medias.length === 0||progress > 0) return
        if(stat==="block") return
        let newMedias:any = []
        setProgress(medias.length>0?5:50)
        if(medias.length>0) {
            await Promise.all(medias.map(async(media,index) => {
                const uploadedFile = await startUpload([media.file]);
        
                if(uploadedFile && uploadedFile[0].url) {
                    newMedias[index] = {
                        url:uploadedFile[0].url,
                        type:media.type}
                }
            }))
        }
        try {
            const res = await axios.post(`${socketS}/messages/send`,{
                content:text,
                medias:newMedias,
                otherId,
                convoId,
                userId

            })
            if(res.data) {
                handleSent()
                if(otherId.toString() !== "100") {
                    return setProgress(0)
                }
                setAiMsgs(prev => ([...prev,{role:"user",content:content.text}]))
                const messages = [...aiMsgs,{role:"user",content:content.text}]
                try {
                    const  response = await openAi.chat.completions.create(
                        {
                            model:process.env.NEXT_PUBLIC_OPENAI_MODEL as string,
                            messages:messages as any
                        }
                    )
                  
                    if(response.choices.length>0) {
                        const message = response.choices[0].message.content || ""
                        const res = await axios.post(`${socketS}/messages/send`,{
                            content:message,
                            medias:newMedias,
                            otherId:userId,
                            convoId,
                            userId:otherId
            
                        })
                        if(res.data) {
                           
                            return setProgress(0)
                        }
                    }
                    
                } catch (error) {
                    toast({
                        varient:"error",
                        title:"Error",
                        description:"Error accepting msg!"
                    })
                    setProgress(0)
                }
                
                
            }
        } catch (error:any) {
            setProgress(0)
            toast({
                varient:"error",
                title:"Error",
                description:error.message
            })
        }
       

    }
    useEffect(() => {
        if(otherId.toString()!=="100") return
        const getAiMsg = async() => {
            const res = await Misc.getAiMessages(userId,(user as any).gender)
            if(res?.success) {
                setAiMsgs(res.data)
            }
        }
        getAiMsg()
    },[otherId,user,userId])
    return (
        <>
            {stat!=="block"&&<>
                {!check 
                ?
                <div className="p-1 hover:bg-gray-300/30 rounded-full cursor-pointer transition-all duration-300 active:scale-95 ml-1">
                    <HiThumbUp />
                </div>
                :
                <div className="p-1 hover:bg-gray-300/30 rounded-full cursor-pointer transition-all duration-300 active:scale-95 ml-1 "
                
                onClick={handleSend}>
                    {progress>0&&<div className="relative flex items-center justify-center">
                        <LoadingAnimation />
                        <p className="absolute text-xs text-black">{progress}</p>
                    </div>}
                    {!progress&&<IoSend />}
                </div>}
            
            </>}
        </>
    )
}