import { ConvoType, MessageType } from "@/lib/utils/types/convo"
import { UserType } from "@/lib/utils/types/user";
import { SetStateAction, useEffect, useState } from "react"
import ConvoHeader from "./convoHeader";
import ConvoFooter from "./footer/convoFooter";
import { useSocket } from "../Wrappers/socketWrapper";
import ConvoMessages from "./messages/convoMessages";
export default function ConvoTab({convos,setConvos,user,setSideConvos}:{
    convos:ConvoType[],
    setConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    user:UserType;
    setSideConvos:React.Dispatch<SetStateAction<ConvoType[]>>
}) {
    const [mouseEntered,setMouseEntered] = useState<boolean>(false)
    const {socket,isConnected} = useSocket()
   
    useEffect(() => {
        if(!socket) return
        convos.forEach(convo=>{
            const key = `${convo.id}-message-key`
            socket.on(key,(data:MessageType) => {
            
                setConvos((prev:ConvoType[]) => {
                    const newData = prev.map(convo => {
                        if(convo.id === data.convo_id) {
                            return {...convo,messages:[...convo.messages,data]}
                        }
                        return convo
                    })
                    return newData
                })
            })

        })
        
        return () => {
            convos.forEach(convo => {
                const key = `${convo.id}-message-key`
                socket.off(key)
            })
           
        }
    },[socket])
    return (
        <>
            <div className="fixed bottom-0 right-20">
                <div className="flex gap-5">
                    {convos.map((convo,index) => {
                        const {messages,other} = convo
                       
                        return (
                            
                            <div key={convo.id+index+index} 
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
                    })}

                </div>
            </div>
        </>
    )
}