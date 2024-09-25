"use client"
import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper"
import CreateStory from "@/components/stories/create/createStory"
import TopNav from "@/shared/navTop/topNav"



export default function Page() {
    const {user} = useLoginInfo()
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