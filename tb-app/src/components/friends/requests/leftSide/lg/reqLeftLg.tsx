import { LeftTopInfoLg } from "@/components/friends/shared/topLeftInfo"
import SentRequests from "../assets/sentRequests"
import { FriendType } from "@/lib/utils/types/friend"
import Link from "next/link"
import { usePathname } from "next/navigation";
import LoadingAnimation from "@/shared/spinner";

interface Props {
    requests:FriendType[];
    loading:number;
    handleConfrim:(arg1:any,arg2:any) => void;
    handleDecline:(arg1:any,arg2:any) => void;
}

export default  function ReqLeftLg({requests,loading,handleConfrim,handleDecline}:Props) {
    const pathname = usePathname()
    return (
        <div className="flex flex-col gap-3 p-4 px-5">
            <LeftTopInfoLg tab="requests" />
            <div>
                {requests.length>0&&
                <p className="font-semibold">{requests.length} Friend Request{requests.length>1?"s":""}</p>}
                <SentRequests/>
            </div>
            <div className="flex flex-col overflow-y-scroll custom-scrollbar pb-10">
                {requests.map((req,index) => {
                    const {user,id} = req
                    const check = user.id === loading
                    return (
                        <Link href={`${pathname}?profile=${user.username}`} key={index} className="flex items-center gap-3 hover:bg-gray-300/30 p-2 rounded-md transition-all duration-300">
                            <div className="w-[60px] h-[60px] rounded-full">
                                <img 
                                src={user.image??"/profile.jpg"} 
                                alt={`${user.name} profile img`}
                                className="rounded-full w-full h-full object-cover bg-white border " />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-black/50 text-sm">1d</p>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <button className="bg-blue-600 text-white rounded-md p-1 py-[0.3rem] hover-opacity active:scale-95 flex-1" onClick={(e) => handleConfrim(e,user.id)}>
                                        {check?<LoadingAnimation/>:"Confirm"}
                                    </button>
                                    <button className="bg-gray-300/50 text-black rounded-md p-1 py-[0.3rem] hover-opacity active:scale-95 flex-1" onClick={(e) => handleDecline(e,user.id)}>Decline</button>
                                </div>
                            </div>
                        </Link>
                    )
                })}
                
            </div>
        </div>
    )
}