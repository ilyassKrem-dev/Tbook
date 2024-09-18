import { UserType, userFriendsType } from "@/lib/utils/types/user"
import { useConvo } from "@/assets/Wrappers/convoWrapper"
import { useEffect, useState } from "react"
import { useSocket } from "@/assets/Wrappers/socketWrapper"

export default function ContactFrame({userInfo,userId,user}:{
    userInfo:userFriendsType,
    userId:string;
    user:UserType
}) {
    const {friend,unseenMsgs,convoId} = userInfo
    const [numbreUnseen,setNumbreUnseen] = useState<number>(unseenMsgs ?? 0)
    const {handleClick} = useConvo()
    const {socket} = useSocket()
    const handleShow = () => {

        setNumbreUnseen(0)
        handleClick(
            {
                user_id:userId,
                 other_id:friend.id
            }
        )
    }
    useEffect(() => {
        if(!socket||!convoId) return
        const handleChange = (data:any) => {
            if(data.receiver !== userId) return
            setNumbreUnseen(prev => prev + 1)
        }
        const subscribe = () => {
            const key = `${convoId}-message-key`
            socket.on(key,handleChange)
        }
        const unSubscribe = () => {
            const key = `${convoId}-message-key`
            socket.off(key,handleChange)
        }
        subscribe()

        return () => {
            unSubscribe()
        }
    },[socket,convoId])
    return (
        <div className="flex items-center justify-between gap-2 cursor-pointer p-2 hover:bg-gray-300/40 rounded-lg transition-all duration-300" onClick={handleShow}>
            <div className="flex gap-2 items-center">
                <div className="w-[36px] h-[36px] relative">
                    {friend.id.toString() === "100" 
                    ?
                    <img 
                    src="/profileAi.jpg"
                    alt={`${friend.name} image`}
                    className="rounded-full w-full h-full border bg-white object-cover" />
                    :
                    <img 
                    src={friend.image ?? "/profile.jpg"} 
                    alt={`${friend.name} image`}
                    className="rounded-full w-full h-full border bg-white object-cover" />}
                </div>
                <p className=" font-semibold text-base cursor-pointer">{friend.name}</p>
            </div>
            {numbreUnseen>0&&
            <div className="bg-accent rounded-full text-white px-2 text-sm">
                {numbreUnseen > 9 ?"9+" :numbreUnseen}
            </div>}
        </div>
    )
}