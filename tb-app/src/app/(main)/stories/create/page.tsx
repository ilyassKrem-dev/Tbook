"use client"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import TopNav from "@/shared/navTop/topNav"



export default function Page() {
    const {user} = loginInfo()
    return (
        <>
            {user&&
            <div>
                <TopNav />
                <div>
                    Create
                </div>    
            </div>}
        </>
        
    )
}