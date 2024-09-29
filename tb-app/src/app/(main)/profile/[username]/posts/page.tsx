"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"



export default function Page() {
    const router = useRouter()
    const pathname = usePathname();
    const pathString = pathname?.split("posts")
    useEffect(() => {
        if(!pathString) return
        router.push(pathString[0]) 
    },[pathString,router]) 
    return (
        <div>

        </div>
    )
}