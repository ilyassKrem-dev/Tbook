import { SetStateAction, useEffect, useRef, useState } from "react"
import ConvoHeader from "./convoHeader"
import ConvoMessages from "./messages/convoMessages"
import ConvoFooter from "./footer/convoFooter"
import { UserType } from "@/lib/utils/types/user"
import { ConvoType } from "@/lib/utils/types/convo"
import axios from "axios"
import Servers from "@/lib/classes/Servers"
import LoadingAnimation from "@/shared/spinner"
import ConvoClass from "@/lib/classes/Convo"
interface Props {
    convo:ConvoType;
    setConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    setSideConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    user:UserType
}


export default function Convo({convo,setConvos,setSideConvos,user}:Props) {
    const [mouseEntered,setMouseEntered] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [finished,setFinished] = useState<boolean>(false)
    const [allMsgs,setAllMsgs] = useState<boolean>(false)  
    const msgsRef = useRef<HTMLDivElement>(null)
    const {messages,other} = convo
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
    },[messages,user])   
    const handleScroll = async(e:any) => {
        const current = msgsRef.current
        if(!current || !finished || allMsgs) return
        const top = current.scrollTop
        if(top < 5) {
            setFinished(false)
            setLoading(true)
            const FirstMsgId = messages[0].id
            current.scrollTo(0,15)
            try {
                const res = await ConvoClass.getMoreMsgs({
                    convoId:convo.id,
                    lastMsgId:FirstMsgId
                })
                setLoading(false)
                if(res?.success) {
                    if(res.data.length < 15) {
                        setAllMsgs(true)
                    }
                    setConvos((prev:any[]) => {
                        const newData = prev.map(cnv => {
                            if(cnv.id !== convo.id) return cnv
                            return {...cnv,messages:[...res.data,...cnv.messages]}
                        })
                        return newData
                    })
                }
               
            } catch (error) {
                setLoading(false)
                
            }
            
            
        }
        
    } 
 
    useEffect(() => {
        const id = setTimeout(() => {
            setFinished(true)
        },100)
        return () => clearTimeout(id)
    },[])
    return (
        
        <div  
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}>
            <div className="bg-white h-[450px] rounded-t-lg w-[350px] shadow-xl flex flex-col">
                <ConvoHeader 
                convo={convo}
                setConvos={setConvos}
                setSideConvos={setSideConvos}
                mouseEntered={mouseEntered}
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
                    <ConvoMessages 
                    convo={convo} user={user}
                    status={{
                        stat:convo.status,
                        by:convo.status_by
                    }}/>
                </div>
                <ConvoFooter 
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