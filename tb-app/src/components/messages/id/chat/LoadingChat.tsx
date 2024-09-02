import ConvoClass from "@/lib/classes/Convo";
import { ConvoType } from "@/lib/utils/types/convo";
import LoadingAnimation from "@/shared/spinner";
import { SetStateAction, useEffect, useState } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";



export default function LoadingChat({setConvo,convo_id,user_id}:{
    setConvo:React.Dispatch<SetStateAction<ConvoType|undefined>>;
    convo_id:string;
    user_id:string
}) {
    const [showReload,setShowReload] = useState<boolean>(false)
    const [clicked,setClicked] = useState<boolean>(false)
    useEffect(() => {
        const id = setTimeout(() => {
            setShowReload(true)
        },5000)

        return () => clearTimeout(id)
    },[])
    const handleClick = async() => {
        setClicked(true)
        const res = await ConvoClass.getConvo({
            user_id,
            convo_id
        })
        if(res?.success) {
            setConvo(res.data)
        }
    }
    return (
        <div className="flex flex-col gap-3">
            <LoadingAnimation />
            {showReload&&<div className=" flex flex-col gap-2 items-center mt-3">
                <p className=" text-center text-sm">If takes to long<span className="block">reload</span></p>
                <div className=" cursor-pointer active:scale-95" onClick={handleClick}>
                    <FaArrowRotateRight className={` text-blue-500 text-2xl ${clicked?" animate-spin":""}`}/>
                </div>
            </div>}
        </div>
    )
}