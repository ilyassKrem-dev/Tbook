"use client"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import CreateStory from "@/components/stories/create/createStory"
import TopNav from "@/shared/navTop/topNav"



export default function Page() {
    const {user} = loginInfo()
    return (
        <>
            {user&&
            <div>
                <TopNav />
                <CreateStory />      
            </div>}
        </>
        
    )
}