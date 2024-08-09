import { SetStateAction, useEffect, useState } from "react"
import ConvoHeader from "./convoHeader"
import ConvoMessages from "./messages/convoMessages"
import ConvoFooter from "./footer/convoFooter"
import { UserType } from "@/lib/utils/types/user"
import { ConvoType } from "@/lib/utils/types/convo"
import axios from "axios"
import Servers from "@/lib/classes/Servers"
interface Props {
    convo:ConvoType;
    setConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    setSideConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    user:UserType
}


export default function Convo({convo,setConvos,setSideConvos,user}:Props) {
    const [mouseEntered,setMouseEntered] = useState<boolean>(false)
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
    return (
        
        <div  
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}>
            <div className="bg-white h-[450px] rounded-t-lg w-[350px] shadow-xl flex flex-col">
                <ConvoHeader 
                convo={convo}
                setConvos={setConvos}
                setSideConvos={setSideConvos}
                mouseEntered={mouseEntered}/>
                <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
                    <ConvoMessages 
                    convo={convo} user={user}/>
                </div>
                <ConvoFooter 
                mouseEntered={mouseEntered}
                user={user}
                otherId={other.id}
                convoId={convo.id}/>
            </div>
        </div>
        
    )
}