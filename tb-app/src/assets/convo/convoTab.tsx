import { ConvoType, MessageType } from "@/lib/utils/types/convo"
import { UserType } from "@/lib/utils/types/user";
import { SetStateAction, useEffect, useState } from "react"
import { useSocket } from "../Wrappers/socketWrapper";
import Convo from "./convo";
export default function ConvoTab({convos,setConvos,user,setSideConvos}:{
    convos:ConvoType[],
    setConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    user:UserType;
    setSideConvos:React.Dispatch<SetStateAction<ConvoType[]>>
}) {
    const {socket} = useSocket()
    useEffect(() => {
        if(!socket||!convos) return
        const handleNewMessage = (data: MessageType) => {
            setConvos(prev => prev.map(convo => 
                convo.id === data.convo_id ? { ...convo, messages: [...convo.messages, data] } : convo
            ));
        };
        const handleReaction = (data:any) => {
        
            setConvos((prev:ConvoType[]) => {
                const newData = prev.map(convo => {
                    if(convo.id !==data.convo_id) return convo
                    const messages = convo.messages.map(message=> {
                        if(message.id!==data.id) return message
                        return {...message,reaction:data.reaction}
                    })
                    return {...convo,messages:messages}
                })
                return newData
            })
        }
        const handleSeen = (data:any) => {
            setConvos((prev:ConvoType[]) => {
                const newData = prev.map(convo => {
                    if(convo.id !==data.convo_id) return convo
                    const messages = convo.messages.map(message=> {
                        if(message.receiver!==data.receiver || message.seen) return message

                        return {...message,seen:data.seen}
                    })
                    return {...convo,messages:messages}
                })
                return newData
            })
        }
        const handleStatus = (data:any) => {
            
            setConvos((prev:ConvoType[]) => {
                const newData = prev.map(convo => {
                    if(data.convoId !== convo.id) return convo
                    return {...convo,
                        status:data.status,
                        status_by:data.status_by
                    }
                })
                return newData
            })
        }
        const subscribeToEvents = () => {
            convos.forEach((convo) => {
              const messageKey = `${convo.id}-message-key`;
              const reactionKey = `${convo.id}-reaction-key`;
              const seenKey = `${convo.id}-seen-key`;
              const blockKey = `${convo.id}-status-key`
              socket.on(messageKey, handleNewMessage);
              socket.on(reactionKey, handleReaction);
              socket.on(seenKey, handleSeen);
              socket.on(blockKey,handleStatus)
            });
          };
        const unsubscribeFromEvents = () => {
        convos.forEach((convo) => {
            const messageKey = `${convo.id}-message-key`;
            const reactionKey = `${convo.id}-reaction-key`;
            const seenKey = `${convo.id}-seen-key`;
            const blockKey = `${convo.id}-status-key`
            socket.off(messageKey, handleNewMessage);
            socket.off(reactionKey, handleReaction);
            socket.off(seenKey, handleSeen);
            socket.off(blockKey,handleStatus)
        });
        };
        subscribeToEvents()
        
        return () => {
            unsubscribeFromEvents()
           
        }
    },[socket,convos])
   
    return (
        <>
            <div className="fixed bottom-0 right-20">
                <div className="flex gap-5">
                    {convos.map((convo,index) => {
                        return (
                            <Convo
                            key={convo.id+index+convo.id+index+6} 
                            convo={convo} 
                            user={user} 
                            setConvos={setConvos} 
                            setSideConvos={setSideConvos}/>
                            
                        )
                    })}

                </div>
            </div>
        </>
    )
}