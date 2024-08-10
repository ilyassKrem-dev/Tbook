
import { HiThumbUp } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { useState } from "react";
import { useToast } from "@/assets/Wrappers/toastWrapper";
import Servers from "@/lib/classes/Servers";
import LoadingAnimation from "@/shared/spinner";
type ContentType = {
    text:string;
    medias:{
        url:string;
        type:"audio"|"image"|"video";
        file:File[]  
    }[]
}



export default function SendMsg({content,userId,otherId,convoId,handleSent,status}:{
    content:ContentType,
    userId:string;
    otherId:string;
    convoId:string;
    handleSent:() => void;
    status:{
        stat:string|null;
        by:string|null
    }
}) {
    const [progress,setProgress] = useState<number>(0)
    const handleUpload = async(file:File[]) => {
        if(medias.length === 0) return
        const {startUpload} = useUploadThing("media",{
            onUploadProgress:(p) => setProgress(p)
        })
        return await startUpload(file)
    }
    const socketS = Servers.socketUrl
    const {text,medias} = content

    const check = text.length>0 || medias.length>0

    const {toast} = useToast()
    const {stat,by} = status
    const handleSend = async() => {
        if(text.length===0 && medias.length === 0||progress > 0) return
        if(stat==="block") return
        let newMedias = []
        setProgress(medias.length>0?5:50)
        if(medias.length>0) {
            await Promise.all(medias.map(async(media,index) => {
                const uploadedFile = await handleUpload(media.file);
                if(uploadedFile && uploadedFile[0].url) {
                    newMedias[index] = {url:uploadedFile[0].url,type:media.type}
                }
            }))
        }
        
        try {
            const res = await axios.post(`${socketS}/messages/send`,{
                content:text,
                medias,
                otherId,
                convoId,
                userId

            })
            if(res.data) {
                handleSent()
                return setProgress(0)
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