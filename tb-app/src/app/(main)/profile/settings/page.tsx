"use client"
import Settings from "@/components/profileComp/settings/settings"
import TopNav from "@/shared/navTop/topNav"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"

export default function Page() {
    const {user} = loginInfo()
    return (
        <>  
            {user&&
            <div>
                <TopNav /> 
                <Settings />
            </div>}
            
        </>
    )
}