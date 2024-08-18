import { FaArrowLeft } from "react-icons/fa6"
import Link from "next/link"
import { SetStateAction, useState } from "react"
import LoadingAnimation from "@/shared/spinner"
import { UserType } from "@/lib/utils/types/user"
import { FriendType } from "@/lib/utils/types/friend"
import Friend from "@/lib/classes/Friend"
import LeftTemplate from "../../shared/leftTemplate"
import { removeOverlay, useSize } from "@/lib/utils/hooks"
import BurgerCross from "../../shared/burgerCross"
import { AnimatePresence, motion } from "framer-motion"
export default function RequestLeft({loggedInfo,requests,setRequests}:{
    loggedInfo:UserType;
    requests:FriendType[];
    setRequests:React.Dispatch<SetStateAction<FriendType[]>>
}) {
    const [showReq,setShowReq] = useState<boolean>(false)
    const [show,setShow] = useState<boolean>(false)
    const [loading,setLoading] = useState<number>(0)
    const handleConfrim = async(e:any,other_id:number) => {
        e.preventDefault()
        if(loading!==0) return
        setLoading(other_id)
        const res = await Friend.addFriend(loggedInfo.id,other_id.toString())
        if(res?.success) {
            setLoading(0)
            setRequests(prev => (prev.filter(req=>req.user.id!==other_id)))
        }
    }
    const handleDecline = async(e:any,other_id:number) => {
        e.preventDefault()
        setRequests(prev => (prev.filter(req=>req.user.id!==other_id)))
        await Friend.removeFriend(loggedInfo.id,other_id.toString(),"")
    }
    removeOverlay({
        tab:".request-nav",
        setShow
    })
    const {w} = useSize()
    return (
        <LeftTemplate>
            {w>767&&<div className="flex flex-col gap-3 p-4 px-5">
                <div className="flex items-center gap-4">
                    <Link href={"/friends/"} className="text-xl text-black/60 hover:bg-gray-300/60 p-2 transition-all duration-300 rounded-full active:scale-95">
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <span className="text-black/50 text-sm">Friend</span>
                        <h1 className="text-2xl font-bold">Friend Requests</h1>
                    </div> 
                </div>
                <div>
                    {requests.length>0&&
                    <p className="font-semibold">{requests.length} Friend Request{requests.length>1?"s":""}</p>}
                    <p className="text-sm cursor-pointer text-blue-500" onClick={() =>setShowReq(true)}>View sent requests</p>
                </div>
                <div className="flex flex-col overflow-y-scroll custom-scrollbar pb-10">
                    {requests.map((req,index) => {
                        const {user,id} = req
                        const check = user.id === loading
                        return (
                            <Link href={`/friends/requests?profile=${user.username}`} key={index} className="flex items-center gap-3 hover:bg-gray-300/30 p-2 rounded-md transition-all duration-300">
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
            </div>}
            {w<=767&&<div className="flex flex-col gap-3 p-2 shadow-md request-nav">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={"/friends/"} className="text-xl text-black/60 hover:bg-gray-300/60 p-2 transition-all duration-300 rounded-full active:scale-95">
                            <FaArrowLeft />
                        </Link>
                        <div className="flex items-center gap-1">
                            <h1 className="text-xl md:text-2xl font-bold">Friend Requests</h1>
                            <span className="text-black/50 text-sm mt-1">/ Friend</span>
                        </div>

                    </div>
                    <BurgerCross setShow={setShow} show={show}/>
                </div>
                {show&&
                <div
                
                className="flex flex-col gap-3">
                    <div>
                        {requests.length>0&&
                        <p className="font-semibold">{requests.length} Friend Request{requests.length>1?"s":""}</p>}
                        <p className="text-sm cursor-pointer text-blue-500" onClick={() =>setShowReq(true)}>View sent requests</p>
                    </div>
                    <div className="flex flex-col overflow-y-scroll max-h-[500px] custom-scrollbar pb-10">
                        {requests.map((req,index) => {
                            const {user,id} = req
                            const check = user.id === loading
                            return (
                                <Link href={`/friends/requests?profile=${user.username}`} key={index} className="flex items-center gap-3 hover:bg-gray-300/30 p-2 rounded-md transition-all duration-300">
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
    
                </div>}

               
            </div>}
        </LeftTemplate>
        
    )
}