import ConvoClass from "@/lib/classes/Convo"
import { getDayOfComment } from "@/lib/utils/simpleUtils"
import { AllConvosType, MessageType } from "@/lib/utils/types/convo"
import { UserType } from "@/lib/utils/types/user"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaFile } from "react-icons/fa6"
import { useSocket } from "@/assets/Wrappers/socketWrapper"


export default function AllConvos({user}:{
    user:UserType
}) {
    const [convos,setConvos] = useState<AllConvosType[]>([])
    const {socket} = useSocket()
    useEffect(() => {
        if(!user) return
        const getConvos = async() => {
            const res = await ConvoClass.getAllConvos(user.id)
            if(res?.success) {
                setConvos(res.data)
            }
        }
        getConvos()
    },[user])
    useEffect(() => {
        if(!socket||convos.length===0) return
        const handleNewMessage = (data:MessageType) => {
            setConvos(prev => {
                const newData = prev.map(convo => {
                    if(convo.id !==data.convo_id) return convo
                    return {...convo,message:data}
                })
                return newData
            })
        }
        const subscribeToEvents = () => {
            convos.forEach(convo => {
                const key = `${convo.id}-message-key`
                socket.on(key,handleNewMessage)
            })
            
        }
        const handleUnsubscribe = () => {
            convos.forEach(convo => {
                const key = `${convo.id}-message-key`
                socket.off(key,handleNewMessage)
            })
        }
        subscribeToEvents()
        return () => handleUnsubscribe()
    },[socket,convos])
    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar py-2 flex flex-col ">
            {convos.map((convo,index) => {
                const {message,other} = convo
                return (
                    <Link key={index} href={`/messages/${convo.id}`} className="flex items-center gap-2 p-2 hover:bg-black/10 rounded-md cursor-pointer transition-all duration-200 active:scale-95">
                        <div className="w-[40px] h-[40px] rounded-full relative">
                            {other.id.toString() === "100" 
                            ?
                            <img 
                            src="/profileAi.jpg" 
                            alt={`image`}
                            className="bg-white border object-cover w-full h-full rounded-full" />
                            :
                            <img 
                            src={other.image??"/profile.jpg"} 
                            alt={other.username + " image"}
                            className="bg-white border object-cover w-full h-full rounded-full" />}
                            {other.status=="online"&&
                            <div className="absolute bottom-[2px] right-[1px] bg-white rounded-full w-[10px] h-[10px] p-[0.1px] flex justify-center items-center">
                                <div className="bg-green-600 rounded-full w-[8px] h-[8px]" />
                                
                            </div>}
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="font-semibold capitalize cursor-pointer w-fit">{other.name}</p>
                            <div className="flex justify-between items-center text-sm text-black/60">
                            <p className="truncate max-w-[130px] flex gap-1 items-center text-black/70">   {message.content 
                                ? 
                                message.content  
                                : 
                                <>
                                    <FaFile />
                                    File
                                </>
                                }
                            </p>
                                <p>{getDayOfComment(message.created_at)}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
            
        </div>
    )
}