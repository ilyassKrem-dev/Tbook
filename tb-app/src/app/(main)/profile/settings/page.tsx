"use client"
import Settings from "@/components/profileComp/settings/settings"
import TopNav from "@/shared/navTop/topNav"
import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper"

export default function Page() {
    const {user} = useLoginInfo()
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