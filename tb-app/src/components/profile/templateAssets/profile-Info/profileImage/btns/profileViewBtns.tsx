
import { IoPersonAdd } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { useEffect, useState } from "react";
import LoadingAnimation from "@/shared/spinner";


interface Props {
    profileId:string;
    isFriends:boolean;
    userId:string;
}

export default function ProfileViewBtns({
    profileId,
    isFriends,
    userId,
}:Props) {
    const [loading,setLoading] = useState<boolean>(false)
    const [sent,setSent] = useState<boolean|null>(null)
    const handleSend = async() => {

    }
    useEffect(() => {
        
    },[userId])
    return (
        <>
            <div className="flex items-center gap-3 pb-6">
                <button className="flex items-center gap-2 font-semibold bg-blue-500 text-white rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]" >
                    <IoPersonAdd  className="text-xl"/>
                    Add friend
                </button>
                <button className="flex items-center gap-2 font-semibold bg-gray-300/60 rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]" >
                    <AiFillMessage  className="text-xl"/>
                    Message
                </button>
            </div>
        </>
    )
}