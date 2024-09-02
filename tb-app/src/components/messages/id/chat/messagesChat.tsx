

import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import ConvoClass from "@/lib/classes/Convo"
import { ConvoType, MessageType } from "@/lib/utils/types/convo"
import LoadingChat from "./LoadingChat"
import { useEffect, useState } from "react"
import ConvoChat from "./convoChat"
import { useSocket } from "@/assets/Wrappers/socketWrapper"
export default function MessagesChat({convo_id}:{
    convo_id:string
}) {
    const {user} = loginInfo()
    const {socket} = useSocket()
    const [convo,setConvo] = useState<ConvoType>()
    useEffect(() => {
        if(!user) return
        const getConvo = async() => {
            const res = await ConvoClass.getConvo({
                user_id:user.id,
                convo_id:convo_id
            })
            if(res?.success) {
                setConvo(res.data)
            }
        }
        getConvo()
    },[user])
    useEffect(() => {
        if(!socket||!convo) return
        const handleNewMessage = (data: MessageType) => {
            setConvo((prev:any) => ({...prev,messages:[...prev?.messages,data]}));
        };
        const handleReaction = (data:any) => {
        
            setConvo((prev:ConvoType|any) => {
                const newData = prev.messages.map((message:MessageType)=> {
                    if(message.id!==data.id) return message
                    return {...message,reaction:data.reaction}
                })
                return {...prev,messages:newData}
            })
        }
        const handleSeen = (data:any) => {
            setConvo((prev:ConvoType|any) => {
                const newData = prev.messages.map((message:MessageType)=> {
                    if(message.receiver!==data.receiver || message.seen) {return message}
                
                    return {...message,seen:data.seen}
                })
                return {...prev,messages:newData}
            })
        }
        const handleStatus = (data:any) => {
            
            setConvo((prev:ConvoType|any) => ({...prev,
                status:data.status,
                status_by:data.status_by
            }))
        }
        const subscribeToEvents = () => {
        
            const messageKey = `${convo.id}-message-key`;
            const reactionKey = `${convo.id}-reaction-key`;
            const seenKey = `${convo.id}-seen-key`;
            const blockKey = `${convo.id}-status-key`
            socket.on(messageKey, handleNewMessage);
            socket.on(reactionKey, handleReaction);
            socket.on(seenKey, handleSeen);
            socket.on(blockKey,handleStatus)
           
          };
        const unsubscribeFromEvents = () => {
            const messageKey = `${convo.id}-message-key`;
            const reactionKey = `${convo.id}-reaction-key`;
            const seenKey = `${convo.id}-seen-key`;
            const blockKey = `${convo.id}-status-key`
            socket.off(messageKey, handleNewMessage);
            socket.off(reactionKey, handleReaction);
            socket.off(seenKey, handleSeen);
            socket.off(blockKey,handleStatus)
       
        };
        subscribeToEvents()
        
        return () => {
            unsubscribeFromEvents()
           
        }
    },[socket,convo])
    return (
        <>
            {user&&convo&&
            <ConvoChat setConvo={setConvo} user={user} convo={convo}/>}
            {user&&!convo&&
            <div className="h-full flex justify-center items-center">
                <LoadingChat setConvo={setConvo} user_id={user.id} convo_id={convo_id}/>
            </div>
            }
        </>
    )
}