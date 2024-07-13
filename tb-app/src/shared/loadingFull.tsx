"use client"
import { useEffect, useState } from "react"
import LoadingAnimation from "./spinner"
import { usePathname } from "next/navigation"
import { FaArrowRotateRight } from "react-icons/fa6";

export default function LaodingFullScreen() {
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
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50">
            <div className="flex flex-col gap-3">
                <LoadingAnimation />
                {showReload&&<div className=" flex flex-col gap-2 items-center mt-3">
                    <p className=" text-center text-sm">If takes to long<span className="block">reload</span></p>
                    <a href={pathname} onClick={() => setClicked(true)}>
                        <FaArrowRotateRight className={` text-blue-500 text-2xl ${clicked?" animate-spin":""}`}/>
                    </a>
                </div>}
            </div>
            
        </div>
    )
}