import { useToast } from "@/assets/Wrappers/toastWrapper";
import Friend from "@/lib/classes/Friend";
import LoadingAnimation from "@/shared/spinner";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

type StatusType = {
    id:string;
    user:string;
    friend:string;
    status:string|null;
    status_by:string|null
}



export default function FriendBtn({userId,profileId,setFriends}:{
    userId:string;
    profileId:string;
    setFriends:React.Dispatch<SetStateAction<boolean>>
}) {
    const [loading,setLoading] = useState<boolean>(false)
    const [decline,setDecline] = useState<boolean>(false)
    const [status,setStatus] = useState<StatusType|null|boolean>(null)
    const {toast} = useToast()
    const handleSend = async() => {
        if(loading) return
        setLoading(true)
        try {
            const res = await axios.post("/api/socket/add",{
                user:userId,
                friend:profileId
            })
            if(res) {
                setLoading(false)
                const status = res.data.status
                if(status.status == "request") {
                    
                    return setStatus(res.data.status)
                }
                return setStatus(false)
                
            }
        } catch (error:any) {
            setLoading(false)
            toast({
                varient:"error",
                title:"Error",
                description:error.message
            })
        }
    }
    const handleAccept = async() => {
        if(loading) return
        setLoading(true)
        const res = await Friend.addFriend(userId,profileId)
        if(res?.success) {
            setLoading(false)
            setFriends(true)
        }
    }
    const handleDecline = async() => {
        if(decline) return
        setDecline(true)
        const res = await Friend.removeFriend(userId,profileId,"")
        if(res?.success) {
            setDecline(false)
            setStatus(null)
        }
    }
    useEffect(() => {
        const getStatus = async() => {
            const res = await Friend.getUserStatus(userId,profileId)
            if(res?.success) {
                setStatus(res.data as any)
            }
        }
        getStatus()
    },[userId])
    return (
        <>
            {status!==null&&
            <>
                {!status?
                <button className="flex items-center gap-2 font-semibold bg-blue-500 text-white rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]" onClick={handleSend} >
                    {!loading?<>
                        <IoPersonAdd  className="text-xl"/>
                        Add friend                    
                    </>
                    :
                    <>
                        <LoadingAnimation />
                        Sending
                    </>
                    }
                </button>
                :
                (status as StatusType).friend!==userId
                ?
                <button className="flex items-center gap-2 font-semibold bg-blue-500 text-white rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]">
                    <FaCheck />
                    Sent
                </button>
                :
                <div className="flex items-center">
                    {!decline&&<button className={`flex items-center gap-2 font-semibold bg-blue-500 text-white p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px] ${loading ?" rounded-lg":" rounded-l-lg"}`} onClick={handleAccept}>
                    {!loading?<>
                        <FaCheck />
                        Accept                    
                    </>
                    :
                    <>
                        <LoadingAnimation />
                        Accepting
                    </>
                    }
                    </button>}
                    {!loading&&<button className={`flex items-center gap-2 font-semibold bg-accent text-white p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px] rounded-r-lg ${decline ?" rounded-lg":" rounded-r-lg"}`} onClick={handleDecline}>
                        {!decline?
                        <>
                            <RxCross2 />                   
                        </>
                        :
                        <>
                            <LoadingAnimation />
                            Declining
                        </>
                        }
                        
                    </button>}
                </div>
                }
            </>}
        </>
    )
}