import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { NotificationType } from "@/lib/utils/types/notification";
import { useSocket } from "@/assets/Wrappers/socketWrapper";
import Misc from "@/lib/classes/Misc";
import RequestNotification from "./requestNoti";

export default function Notifications({userId}:{
    userId:string
}) {
    const [show,setShow] = useState<boolean>(false)
    const [notifications,setNotifications] = useState<NotificationType[]>([])
    const {socket} = useSocket()
    const key = `${userId}-key`

    useEffect(() => {
        const getData = async() => {
            const res = await Misc.getUserNotifications(userId)
            if(res?.success) {
                setNotifications(res.data)
            }
        }
        getData()
    },[userId])
    useEffect(() => {
        if(!socket) return
        socket.on(key,(data:NotificationType) => {
            setNotifications(prev => ([data,...prev]))
        })

        return () => {
            socket.off()
        }
    },[key,socket])
    return (
        <>
            <div className="h-full rounded-full p-2 text-2xl bg-white-1 active:scale-90 hover:bg-gray-300 cursor-pointer relative flex flex-col items-center justify-center" onClick={() => setShow(prev => !prev)}>
                <IoIosNotifications />
                {notifications.length > 0&&
                <div className="absolute -top-1 -right-2">
                    <div className={`bg-accent text-white text-xs rounded-full font-normal p-1  ${notifications.length > 9 ? "":"px-2"}`}>
                            {
                                notifications.length > 9 ? "9+":notifications.length
                            }
                            
                    </div>
                </div>}
                
            </div>
            {show&&
            <RequestNotification 
            notifications={notifications}
            setNotifications={setNotifications}
            userId={userId}
            setShow={setShow}/>}
        </>
    )
}