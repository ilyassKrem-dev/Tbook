import LoadingAnimation from "@/shared/spinner";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";

export default function LoadingReload() {
    const [showReload,setShowReload] = useState<boolean>(false)
    const [clicked,setClicked] = useState<boolean>(false)
    const pathname = usePathname()
    useEffect(() => {
        const id = setTimeout(() => {
            setShowReload(true)
        },5000)

        return () => clearTimeout(id)
    },[])
    
    return (
       
        <div className="flex flex-col gap-3">
            <LoadingAnimation />
            {showReload&&<div className=" flex flex-col gap-2 items-center mt-3">
                <p className=" text-center text-sm">If takes to long<span className="block">reload</span></p>
                <a href={pathname as string} onClick={() => setClicked(true)}>
                    <FaArrowRotateRight className={` text-blue-500 text-2xl ${clicked?" animate-spin":""}`}/>
                </a>
            </div>}
        </div>
    )
}