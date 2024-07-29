import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { NotificationType } from "@/lib/utils/types/notification";
import { useSocket } from "@/assets/Wrappers/socketWrapper";
import Misc from "@/lib/classes/Misc";


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
    },[])
    useEffect(() => {
        if(!socket) return
        socket.on(key,(data:NotificationType) => {
            setNotifications(prev => ([data,...prev]))
        })

        return () => {
            socket.off()
        }
    },[])
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
            <div className="absolute -bottom-40 z-40 -right-8">
                    <div className="bg-white rounded-lg w-[400px] flex flex-col gap-6 p-2 font-normal text-base sm-shadow px-6">
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-2xl">Notifications</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                           {notifications.slice(0,5).map((noti,index) => {
                            const {msg,data,user} = noti
                            return (
                                <div key={index} className="flex gap-3 items-center">
                                    <div className="w-[50px] h-[50px]">
                                        <img 
                                        src={user.image?user.image:"/profile.jpg"} 
                                        alt={`${user.name} picture`}
                                        className="rounded-full object-cover w-full h-full border bg-white" />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1 items-center">
                                        <div className=" break-words">
                                            {user.name} has sent a frirend request
                                        </div>
                                        <div className="flex items-center gap-3 w-full px-4">
                                            <button className="bg-blue-500 rounded-lg p-[0.4rem] text-white flex-1 hover-opacity active:scale-95">Accept</button>
                                            <button className=" bg-accent/80 rounded-lg p-[0.4rem] text-white flex-1 hover-opacity active:scale-95">Decline</button>
                                        </div>
                                    </div>
                                    <div className="w-[30px]">

                                    </div>
                                </div>
                            )
                           })}
                        </div>
                       
                    </div>
            </div>
        </>
    )
}