import { useToast } from "@/assets/Wrappers/toastWrapper";
import Friend from "@/lib/classes/Friend";
import LoadingAnimation from "@/shared/spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";




export default function FriendBtn({userId,profileId}:{
    userId:string,
    profileId:string
}) {
    const [loading,setLoading] = useState<boolean>(false)
    const [status,setStatus] = useState<string|null>(null)
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
                setStatus(res.data.status)
        
                setLoading(false)
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
    useEffect(() => {
        const getStatus = async() => {
            const res = await Friend.getUserStatus(userId,profileId)
            if(res?.success) {
                setStatus(res.msg)
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
                <button className="flex items-center gap-2 font-semibold bg-blue-500 text-white rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]">
                    <FaCheck />
                    Sent
                </button>}
            </>}
        </>
    )
}