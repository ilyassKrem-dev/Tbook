
import { NotificationType } from "@/lib/utils/types/notification"
import { SetStateAction } from "react";
import Friend from "@/lib/classes/Friend";
import { useRemoveOverlay } from "@/lib/utils/hooks";
import Link from "next/link";
export default function RequestNotification({notifications,setNotifications,userId,setShow}:{
    notifications:NotificationType[];
    setNotifications:React.Dispatch<SetStateAction<NotificationType[]>>;
    userId:string;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    const handleAccept = async(profile_id:string) => {
        const res = await Friend.addFriend(userId,profile_id)
        if(res?.success) {
            setNotifications(prev => {
                return prev.filter(noti => noti.user.id !== profile_id)
            })
        }
    }
    const handleDecline = async(profile_id:string) => {
        const res = await Friend.removeFriend(userId,profile_id,"request")
        if(res?.success) {
            setNotifications(prev => {
                return prev.filter(noti => noti.user.id !== profile_id)
            })
        }
    }
    useRemoveOverlay({
        tab:".noti-tab",
        setShow
    })
    return (
        <>
            <div className="absolute top-14 z-40 -right-6 noti-tab">
                <div className="bg-white rounded-lg w-[400px] flex flex-col gap-6 p-2 font-normal text-base sm-shadow px-4">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-2xl">Notifications</h1>
                        <Link href={"/notifications"} className="text-blue-400 underline text-xs hover-opacity">
                            View all
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        {notifications.slice(0,4).map((noti,index) => {
                        const {msg,data,user} = noti
                        return (
                            <div key={index} className="flex gap-3 items-center hover:bg-gray-300/40 transition-all duration-300 p-1 rounded-lg">
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
                                        <button className="bg-blue-500 rounded-lg p-[0.4rem] text-white flex-1 hover-opacity active:scale-95" onClick={() => handleAccept(user.id)}>Accept</button>
                                        <button className=" bg-accent/80 rounded-lg p-[0.4rem] text-white flex-1 hover-opacity active:scale-95" onClick={() => handleDecline(user.id)}>Decline</button>
                                    </div>
                                </div>
                                <div className="w-[30px]">

                                </div>
                            </div>
                        )
                        })}
                        {notifications.length==0&&
                        <div className="text-center">
                            <h1>No notifications</h1>
                        </div>}
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}