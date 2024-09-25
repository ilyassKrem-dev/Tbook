"use client"
import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper"




export default function Page() {
    const {user} = useLoginInfo()

    return (
        <>
            {user&&
            <div className="flex justify-center items-center h-screen">
                <p className="font-bold text-xl">Select a story to open</p>
                 
            </div>}
        </>
        
    )
}