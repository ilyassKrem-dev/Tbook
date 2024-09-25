
import ConvoMessages from "@/assets/convo/messages/convoMessages";
import ConvoClass from "@/lib/classes/Convo";
import Servers from "@/lib/classes/Servers";
import { ConvoType } from "@/lib/utils/types/convo"
import { UserType } from "@/lib/utils/types/user";
import LoadingAnimation from "@/shared/spinner";
import axios from "axios";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import ConvoFooter from "@/assets/convo/footer/convoFooter";
import React from "react";
import ChatHeader from "./chatHeader";
interface Props {
    convo:ConvoType,
    setConvo:React.Dispatch<SetStateAction<ConvoType|undefined>>;
    user:UserType
}
const ConvoHeader = React.memo(ChatHeader)
const ConvoFooterMemo = React.memo(ConvoFooter)
export default function ConvoChat({convo,setConvo,user}:Props) {
    
    const {other,messages} = convo
    const msgsRef = useRef<HTMLDivElement>(null)
    const [added,setAdded] = useState<boolean>(false)
    const [mouseEntered,setMouseEntered] = useState<boolean>(false)
    const [allMsgs,setAllMsgs] = useState<boolean>(false)  
    const [loading,setLoading] = useState<boolean>(false)
    const [finished,setFinished] = useState<boolean>(false)
    const socketUrl = Servers.socketUrl
    
    useEffect(() => {
        if(!user) return
        const findMsg = convo.messages.find(msg => !msg.seen &&  msg.receiver === user.id)
        if(!findMsg) return
        const setSeen =async() => {
            try {
                const res = await axios.post(`${socketUrl}/messages/seen`,{
                    user_id:user.id,
                    convo_id:convo.id
                })
                if(res.data) return
            } catch (error) {
              
                return
            }
        }
        setSeen()
    },[messages,user,convo,socketUrl])   
    const handleScroll = async(e:any) => {
        const current = msgsRef.current
        if(!current || !finished || allMsgs) return
        const top = current.scrollTop
        if(top < 1) {
          
            setFinished(false)
            setLoading(true)
            const FirstMsgId = messages[0].id
            const scrollPosition = current.scrollTop; 
            try {
                const res = await ConvoClass.getMoreMsgs({
                    convoId:convo.id,
                    lastMsgId:FirstMsgId
                })
               
                setLoading(false)
                if(res?.success) {
                    setAdded(true)
                    setConvo((prev:any) => ({...prev,messages:[...res.data,...prev?.messages]}))
                    current.scrollTop = (scrollPosition+10)*(res.data.length);
                    if(res.data.length < 15) {
                        setAllMsgs(true)
                        current.scrollTop = (scrollPosition+10)*(res.data.length);
                    } else {
                        current.scrollTop = scrollPosition + (current.scrollHeight - scrollPosition - e.target.clientHeight)
                    }
                }
                
            } catch (error) {
                setLoading(false)
                
            }
            
            
        }
        
    } 
    
    useEffect(() => {
        if(finished) return
        const id = setTimeout(() => {
            setFinished(true)
        },500)
        return () => clearTimeout(id)
    },[finished])
    const memoizedMessages = useMemo(() => (
        <ConvoMessages
            convo={convo}
            user={user}
            added={added}
            status={{
                stat: convo.status,
                by: convo.status_by
            }}
        />
    ), [convo, user, added]);
    return (
        <div className="bg-white h-full flex flex-col border-x shadow-lg" 
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}>
                <ConvoHeader 
                convo={convo}
                user={user}/>
                <div
                ref={msgsRef} 
                className="flex-1 h-full overflow-y-auto custom-scrollbar relative" 
                onScroll={handleScroll}>
                    {loading&&<div className="absolute top-6 left-0 right-0 flex justify-center items-center z-40 ">
                        <div className="bg-white w-fit">
                            <LoadingAnimation />
                        </div>
                        
                    </div>}
                    {memoizedMessages}
                </div>
                <div className="bg-white">
                    <ConvoFooterMemo 
                    mouseEntered={mouseEntered}
                    user={user}
                    otherId={other.id}
                    convoId={convo.id}
                    status={convo.status}
                    statusBy={convo.status_by}/>

                </div>
        </div>
    )
}