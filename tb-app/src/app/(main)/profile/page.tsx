"use client"
import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper"
import TopNav from "@/shared/navTop/topNav"
import Profile from "@/components/profile/Profile"
import { UserType } from "@/lib/utils/types/user"

export default function Page() {
    const {user} = useLoginInfo()
   
    return (
        <>
            {user&&
            <div>
                <TopNav /> 
                <Profile user={user as UserType}/>
                
            </div>}
        
        </>
    )
}