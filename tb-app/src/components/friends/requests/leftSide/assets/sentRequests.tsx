import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import Friend from "@/lib/classes/Friend"
import { FriendType } from "@/lib/utils/types/friend"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { RxCross2 } from "react-icons/rx"
import LoadingAnimation from "@/shared/spinner"
import { removeOverlay } from "@/lib/utils/hooks"



export default function  SentRequests() {
    const [showReq,setShowReq] = useState<boolean>(false)
    const [sentReq,setSentreq] = useState<FriendType[] | null>(null)
    const {user} = loginInfo()
    useEffect(() => {
        if(!user) return
        const getRequestSent = async () => {
            const res = await Friend.getUserRequests(user.id)
            if(res?.success) {
                setSentreq(res.data)
            }
            
        }
        getRequestSent()
    },[user])
    const handleRemove = async(other_id:number) => {
        if(!sentReq) return

        const res = await Friend.removeFriend(other_id.toString(),user?.id as string,"request")
        if(res?.success) {
            setSentreq((prev:any) => (prev?.filter((req:FriendType)=>req.user.id!==other_id)))
        }
    }
    useEffect(() => {
        if(!showReq) return
        const overlayRe = (e:any) => {
            const overlay = document.querySelector(".userRequests")
            if(overlay && !overlay.contains(e.target)) {
                setShowReq(false)
            }
        }
        document.addEventListener("click",overlayRe)

        return () => document.removeEventListener("click",overlayRe)
    },[showReq])
    return (
        <div className="relative">
             <p className="text-sm cursor-pointer text-blue-500" onClick={() =>setShowReq(true)}>View sent requests</p>
             {showReq&&ReactDOM.createPortal(<div className="fixed top-0 left-0 right-0 bottom-0 bg-white/70 z-[9999] flex justify-center items-center">
                    <div className="bg-white w-[300px] sm:w-[500px] md:w-[520px] h-fit rounded-lg shadow-[0px_0px_11px_5px_rgba(0,0,0,0.12)] flex flex-col userRequests">
                        <div className="p-4 relative flex items-center border-b border-black/10  justify-center">
                            <h1 className="font-bold text-xl">Sent Requests</h1>
                            <div className="absolute text-2xl bg-gray-300/50 p-2 rounded-full right-2 cursor-pointer hover:bg-gray-300/80 transition-all duration-300 active:scale-95" onClick={() => setShowReq(false)}>
                                <RxCross2 />
                            </div>
                        </div>
                        {sentReq&&<div className={`${sentReq.length === 0 ?"p-8":"p-2"}`}>
                            {sentReq.length === 0 &&
                            <p className=" break-words text-[0.9rem] text-black/60 text-center">
                                When you send someone a friend request, it will appear here.
                            </p>}
                            <div className="overflow-y-auto custom-scrollbar max-h-[500px]">
                                {sentReq.length>0&&sentReq.map((req,index) => {
                                    const friendInfo = req.user
                                    const {id,image,username,name} = friendInfo
                                    return (
                                        <div key={index} className="flex items-center gap-2 w-full p-2">
                                            <div className="w-[50px] h-[50px] rounded-full">
                                                <img 
                                                src={image??"/profile.jpg"}
                                                alt={`${name} picture`}
                                                className="bg-white border w-full h-full rounded-full object-cover" />
                                            </div>
                                            <div className="flex justify-between w-full items-center">
                                                <div>
                                                    <p className="font-semibold">{name}</p>
                                                    <p className="text-black/60 text-sm">@{username}</p>
                                                </div>
                                                <div>
                                                    <button className="bg-accent rounded-md p-1 px-3 text-white cursor-pointer hover-opacity active:scale-95" onClick={() =>handleRemove(id)}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                
                            </div>
                        </div>}
                        {!sentReq&&
                        <div className="p-8">
                            <LoadingAnimation />
                        </div>}
                    </div>
             </div>,document.body)}
        </div>
    )
}