import { useEffect, useMemo, useRef, useState } from "react"
import ConvoHeader from "./convoHeader"
import ConvoMessages from "./messages/convoMessages"
import ConvoFooter from "./footer/convoFooter"
import { UserType } from "@/lib/utils/types/user"
import { ConvoType } from "@/lib/utils/types/convo"
import axios from "axios"
import Servers from "@/lib/classes/Servers"
import LoadingAnimation from "@/shared/spinner"
import ConvoClass from "@/lib/classes/Convo"
import React from "react"
import { useDispatch } from "react-redux"
import { handleMoreMsgs } from "../redux/convoRedux"
interface Props {
    convo:ConvoType;
    user:UserType;
    dispatch:ReturnType<typeof useDispatch>
}

const ConvoHeaderMemo = React.memo(ConvoHeader);
const ConvoFooterMemo = React.memo(ConvoFooter);
export default function Convo({convo,user,dispatch}:Props) {
    const [mouseEntered,setMouseEntered] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [finished,setFinished] = useState<boolean>(false)
    const [added,setAdded] = useState<boolean>(false)
    const [allMsgs,setAllMsgs] = useState<boolean>(false)  
    const msgsRef = useRef<HTMLDivElement>(null)
    const {messages,other} = convo
    const socketUrl = Servers.socketUrl
    
    useEffect(() => {
        if(!user) return
        const findMsg = convo.messages.find(msg => !msg.seen &&  msg.receiver === user.id)
        if(!findMsg || other.id.toString() === "100") return
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
    },[messages,user])   
    const handleScroll = async(e:any) => {
        if(other.id.toString() === "100") return
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
                   
                    dispatch(handleMoreMsgs({msgs:res.data,convoId:convo.id}))
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
        },100)
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
        
        <div  
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}>
            <div className="bg-white h-[450px] rounded-t-lg w-[350px] shadow-xl flex flex-col">
                <ConvoHeaderMemo 
                convo={convo}
                mouseEntered={mouseEntered}
                dispatch={dispatch}
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