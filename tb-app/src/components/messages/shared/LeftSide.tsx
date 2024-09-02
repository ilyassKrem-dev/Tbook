"use client"
import { useSize } from "@/lib/utils/hooks"
import { usePathname } from "next/navigation"
import LeftSideMessages from "../assets/leftSide/leftSideMessages"




export default function LeftSideSharedMsg() {
    const pathname = usePathname()
    const {w} = useSize()
    const check = pathname==="/messages" || pathname!=="/messages"&&w>767
    return (
        <>
            {check&&
            <div className="w-[400px] shadow-lg border-r">
                <LeftSideMessages />
            </div>}
        </>
    )
}