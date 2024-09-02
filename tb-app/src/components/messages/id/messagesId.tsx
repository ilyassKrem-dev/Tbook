"use client"
import MessagesChat from "./chat/messagesChat";





export default function MessagesId({convo_id}:{
    convo_id:string
}) {
    return (
        <>
           
            <div className="flex-1 h-full mx-auto max-w-[900px]">
                <MessagesChat convo_id={convo_id}/>
                    
            </div>
            
            
        </>
    )
}