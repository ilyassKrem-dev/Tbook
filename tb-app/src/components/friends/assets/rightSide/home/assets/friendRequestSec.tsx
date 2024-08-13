import Link from "next/link";
import { FriendType, FriendsReqType } from "@/lib/utils/types/friend";
import { UserType } from "@/lib/utils/types/user";
import { SetStateAction, useState } from "react";
import Friend from "@/lib/classes/Friend";
import LoadingAnimation from "@/shared/spinner";



export default function FriendReqSec({requests,loggedInfo,setFriendsR}:{
    requests:FriendType[];
    loggedInfo:UserType;
    setFriendsR:React.Dispatch<SetStateAction<FriendsReqType>>;
}) {
    const [loading,setLoading] = useState<number>(0)
    const handleConfrim = async(other_id:number) => {
        if(loading!==0) return
        setLoading(other_id)
        const res = await Friend.addFriend(loggedInfo.id,other_id.toString())
        if(res?.success) {
            setLoading(0)
            setFriendsR(prev => {
                const newData = prev.requests.filter(req => req.user.id!==other_id)
                return {...prev,requests:newData}
            })
        }
    }
    const handleDecline = async(other_id:number) => {
        setFriendsR(prev => {
            const newData = prev.requests.filter(req => req.user.id!==other_id)
            return {...prev,requests:newData}
        })
        await Friend.removeFriend(loggedInfo.id,other_id.toString(),"")
    }
    return (
        <section className="flex gap-3 flex-col border-b pb-8 border-black/20">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Friends Requests</h1>
                <Link href={"/friends/requests"} className=" text-lg text-blue-500 p-2 rounded-md hover:bg-gray-300/40 transition-all duration-300 active:scale-95">
                    See all
                </Link>
            </div>
            <div className="flex gap-5 flex-wrap items-center">
                {requests.map((req,index) => {
                    const {user,id} = req
                    const check = user.id === loading
                  
                    return (
                        <div key={index} className="rounded-lg flex flex-col gap-1 bg-white border shadow-md border-black/20">
                            <Link href={`/friends/requests/?profile_id=${user.id}`} className="w-[201px] h-[201px] ">
                                <img 
                                src={user.image??"/profile.jpg"}
                                alt={user.name + " profile img"}
                                className="rounded-t-lg bg-white border w-full h-full object-cover" />
                            </Link>
                            <div className="p-2 px-3 flex gap-5 flex-col">
                                <Link href={`/friends/requests/?profile_id=${user.id}`} className="font-bold hover:underline transition-all duration-300">{user.name}</Link>
                                <div className="flex flex-col gap-2">
                                    <button className="bg-blue-500 text-white rounded-md p-1 py-2 hover-opacity active:scale-95" onClick={() => handleConfrim(user.id)}>
                                        {check?<LoadingAnimation/>:"Confirm"}
                                    </button>
                                    <button className="bg-gray-300/50 text-black rounded-md p-1 py-2 hover-opacity active:scale-95" onClick={() => handleDecline(user.id)}>Decline</button>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
    </section>
    )
}