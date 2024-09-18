import { ConvoType, MessageType } from "@/lib/utils/types/convo";
import { UserType } from "@/lib/utils/types/user";
import {  useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaFile } from "react-icons/fa6";
import { useSocket } from "../Wrappers/socketWrapper";
import { useDispatch } from "react-redux";
import { addMessage, addSeen, moveToConvos, removeSideConvo } from "../redux/convoRedux";

interface Props {
    sideConvos:ConvoType[];
    user:UserType|null;
    dispatch:ReturnType<typeof useDispatch>
}

export default function ConvoSide({
    sideConvos,
    user,
    dispatch
}:Props) {
    const {socket} = useSocket()
    const handleRemove = (convoId:string) => {
        dispatch(removeSideConvo({id:convoId}))
    }
    const handleClick = (convoS:ConvoType) => {
        dispatch(moveToConvos(convoS))
    }
    
   
    useEffect(() => {
        if(!socket||!sideConvos) return
        const handleMsg = (data:MessageType) => {
            dispatch(addMessage(data))
        }
        const handleSeen = (data:any) => {
            dispatch(addSeen(data))
        }
        
        const subscribeToEvents = () => {
            sideConvos.forEach(convo=>{
                const key = `${convo.id}-message-key`
                const key2 = `${convo.id}-seen-key`
                socket.on(key,handleMsg)
                socket.on(key2,handleSeen)
            })
          };
        const unsubscribeFromEvents = () => {
            sideConvos.forEach(convo => {
                const key = `${convo.id}-message-key`
                const key2 = `${convo.id}-seen-key`
                socket.off(key)
                socket.off(key2)
               
            })
        };
        subscribeToEvents()
        
        return () => {
            unsubscribeFromEvents()
           
        }
    },[socket,sideConvos])
    return (
        <div className="fixed bottom-4 right-4">
            <div className="flex flex-col gap-3">
                {sideConvos.slice(0,5).map((convo,index) => {
                    const {id,messages,other} = convo
                    const {name,image} = other
                    const lastMsg = messages[messages.length - 1]
                    const msg = lastMsg ? lastMsg.content : "No messages"
                    const seenMSg = messages.filter(msg =>msg.receiver==user?.id && !msg.seen).length
                    return (
                        <div key={id+index+(Math.random())} className="group relative flex justify-center items-center" >
                            <div className="w-[55px] h-[55px] rounded-full cursor-pointer bg-black/30 group relative" >
                                {other.id.toString() === "100" 
                                ?
                                <img 
                                src="/profileAi.jpg" 
                                alt={`image`}
                                className="w-full h-full object-cover rounded-full border bg-white group-hover:opacity-70 transition-all duration-300" 
                                onClick={() => handleClick(convo)}/>
                                :
                                <img 
                                src={image??"/profile.jpg"} 
                                alt={`${name} image`}
                                className="w-full h-full object-cover rounded-full border bg-white group-hover:opacity-70 transition-all duration-300" onClick={() => handleClick(convo)}/>}
                                
                                <div  className="absolute -top-2 right-0 group-hover:block hidden " onClick={() => handleRemove(id)}>
                                    <div className="rounded-full p-1 text-black bg-white text-sm  border hover:bg-gray-300/60 active:scale-95 transition-all duration-300" >
                                        <RxCross2 />
                                    </div>
                                </div>
                                {seenMSg>0&&<div  className="absolute -top-1 -left-1">
                                    <div className={`rounded-full   bg-accent text-xs  border hover:bg-gray-300/60 active:scale-95 transition-all duration-300 px-1 text-white`} >
                                        {seenMSg>9?"9+":seenMSg}
                                    </div>
                                </div>}
                            </div>
                            <div className="absolute right-[4.7rem] group-hover:block hidden">
                                    <div className="bg-white/60 rounded-lg  relative flex justify-center items-center shadow-[0px_0px_5px_1px_rgba(0,0,0,0.2)] border">
                                        <div className="p-1 px-3 w-[150px] flex flex-col gap-1">
                                            <h3 className="font-bold capitalize">{name}</h3>
                                            <p className="truncate max-w-[130px] flex gap-1 items-center text-black/70">{msg 
                                            ? 
                                            msg 
                                            : 
                                            <>
                                                <FaFile />
                                                File
                                            </>
                                            }</p>
                                        </div>
                                        <div className="absolute -right-3 border-y-8 and border-y-transparent border-l-[12px] and border-l-white w-0 h-0 " />
                                    </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}