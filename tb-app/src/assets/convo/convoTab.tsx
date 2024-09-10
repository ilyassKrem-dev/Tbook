"use client"
import { ConvoType, MessageType } from "@/lib/utils/types/convo"
import { UserType } from "@/lib/utils/types/user";
import { SetStateAction, useEffect, useState } from "react"
import { useSocket } from "../Wrappers/socketWrapper";
import Convo from "./convo";
import { useDispatch } from "react-redux";
import { addMessage, addReaction, addSeen, changeStatus } from "../redux/convoRedux";
export default function ConvoTab({convos,user,dispatch}:{
    convos:ConvoType[],
    user:UserType
    dispatch:ReturnType<typeof useDispatch>
}) {
    const {socket} = useSocket()
    useEffect(() => {
        if(!socket||!convos) return
        const handleNewMessage = (data: MessageType) => {
            dispatch(addMessage(data))
        };
        const handleReaction = (data:any) => {
        
            dispatch(addReaction(data))
        }
        const handleSeen = (data:any) => {
            dispatch(addSeen(data))
        }
        const handleStatus = (data:any) => {
            
            dispatch(changeStatus(data))
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
                            dispatch={dispatch}/>
                            
                        )
                    })}

                </div>
            </div>
        </>
    )
}