import { ConvoType, MessageType } from "@/lib/utils/types/convo"
import { UserType } from "@/lib/utils/types/user"
import {useEffect, useMemo, useRef, useState } from "react"
import MediaType from "@/shared/others/mediaType"
import MsgReaction from "./msgReaction";
import { getStringDate } from "@/lib/utils/simpleUtils";
import { motion ,AnimatePresence } from "framer-motion";
import { LuCheck,LuCheckCheck } from "react-icons/lu";
import { changeContentToLinks } from "@/lib/utils/textUtils";
import { MdBlock } from "react-icons/md";
import { useShowMedia } from "@/assets/Wrappers/mediaWrapper";
interface GroupedMessages {
    date: string;
    messages: MessageType[];
}

export default function ConvoMessages({convo,user,status,added}:{
    convo:ConvoType,
    user:UserType,
    status:{
        stat:string|null,
        by:string|null
    };
    added:boolean
    
}) {
    
    const divRef = useRef<HTMLDivElement>(null)
    const {messages,other,id} = convo
    const {stat,by} = status
    const {handleMediaClick} = useShowMedia()

    useEffect(() => {
        if(added) return
        const current = divRef.current
        if(current) {
            current.scrollIntoView({behavior:"smooth"})
        }
    },[messages,stat,added])
    
    const groupedMessages = useMemo(() => {
        const grouped: GroupedMessages[] = [];
        let lastDate = "";

        messages.forEach((message) => {
            const date = getStringDate(message.created_at);
            const { day, month } = date;
            const dateString = `${month},${day}`;

            if (dateString !== lastDate) {
                lastDate = dateString;
                grouped.push({ date: dateString, messages: [message] });
            } else {
                grouped[grouped.length - 1].messages.push(message);
            }
        });

        return grouped;
    }, [messages]);
    

    return (
        <div  
        className="flex flex-col gap-3 p-2 pt-4">
            {groupedMessages.map((group,index) => {
                return (
                    <div key={convo.id+index+index+convo.id} className="flex flex-col gap-3">
                        <div className="text-xs text-center text-black/50 relative flex justify-center items-center">
                            <p className="relative z-30 bg-white w-[90px]">{group.date}</p>
                            <div className="h-px w-full bg-black/50 absolute z-0">

                            </div>
                        </div>
                        {group.messages.map((message,index) => {
                            const {id,sender,receiver,content,medias,reaction,seen} = message
                            const data = sender === user.id ? user : other
                            const isUser = sender === user.id
                            const text = content ? changeContentToLinks(content,false):""
                            return (
                                <div key={index+id+id+index+Math.random()} className={`group w-full flex ${isUser?"justify-end":" justify-start"}`}>
                                    <div className={` flex items-center gap-2 ${isUser?"order-2":"order-1"}`}>
                                        <div className={`rounded-full w-[28px] h-[28px] self-end ${isUser?"order-2":"order-1"}`}>
                                            {data.id.toString() === "100" 
                                            ?
                                            <img 
                                            src="/profileAi.jpg"
                                            alt={`image`}
                                            className="w-full h-full rounded-full bg-white object-cover border" 
                                            />
                                            :
                                            <img 
                                            src={data.image ?? "/profile.jpg"}
                                            alt={data.name + " image"}
                                            className="w-full h-full rounded-full bg-white object-cover border" />}
                                            
                                        </div>
                                        <div className={`flex flex-col gap-1 ${isUser?"order-1 bg-blue-500  text-white":"order-2 bg-black/10 text-black"} rounded-lg relative `}>
                                            
                                            {medias.length>0&&<div className={`p-2 grid ${medias.length > 1 ? " grid-cols-2":""} gap-1`}>
                                                {medias.slice(0,4).map((media,index) => {
                                                    
                                                    return (
                                                        <div key={media.id+index+media.id+1} className="w-[85px] h-[85px] relative cursor-pointer hover:bg-black/20 rounded-md group/image transition-all duration-300 active:scale-95" onClick={() => handleMediaClick(
                                                            {info:(isUser?user:other),
                                                            media,
                                                            medias
                                                            })}>
                                                            <MediaType
                                                            type={media.type}
                                                            media={media.url}
                                                            className="w-full object-fill h-full rounded-md group-hover/image:opacity-80 transition-all duration-300 border bg-white" />
                                                            {medias.length>4&&index==3&&
                                                            <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/50 rounded-md flex items-center justify-center font-semibold text-lg">
                                                                {medias.length - 4}+
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                                
                                            </div>}
                                            <div className={`flex ${!text? "self-end":""}`}>
                                                {text&&<div className={`text-base  p-1 max-w-[200px] px-2 `} dangerouslySetInnerHTML={{__html:text}} />}

                                                {isUser&&
                                                <div className="self-end py-2 p-1">
                                                    {!seen ? 
                                                    <LuCheck />
                                                    :
                                                    <LuCheckCheck />}     
                                                </div>}
                                            </div>
                                            <AnimatePresence>
                                                {reaction&&
                                                <motion.div 
                                                initial={{opacity:0,scale:0.8}}
                                                animate={{opacity:1,scale:1}}
                                                exit={{opacity:0,scale:0.8}}
                                                transition={{duration:0.5,ease:"easeInOut"}}
                                                className={`text-xs bg-white rounded-full p-1 absolute -bottom-2 shadow-md  w-fit ${isUser?"-left-4":"-right-4"}`}>
                                                    <span className=" font-noto">{reaction}</span>
                                                </motion.div>}
                                            </AnimatePresence>
                                        </div>
                
                                    </div>
                                    {!isUser&&<div className={`${isUser ?"order-0 mr-2":"order-3 ml-2"} hidden group-hover:flex`}>
                                        <MsgReaction 
                                        message_id={message.id} 
                                        userId={user.id}
                                        isUser={isUser}/>
                                    </div>}
                                </div>
                            )
                            })}
                                </div>
                            )
                        })}
            {stat==="block"&&<div className="flex justify-center items-center flex-col font-semibold border-t py-2 border-black/50">
                <div className="text-3xl">
                    <MdBlock/>
                </div>
                <p>{by!==user.id?"You have been blocked":`You blocked ${other.name}`}</p>
                        
            </div>}
            <div ref={divRef}/>
        </div>
       
    )
}