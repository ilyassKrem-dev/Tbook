import { useSize } from "@/lib/utils/hooks"
import InfoTab from "./info/infoTab"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import { FaArrowLeft } from "react-icons/fa6"
import { TabsAndLinks } from "../misc/tabs&links"
import { useRouter } from "next/navigation"
import BlockingTab from "./blocking/blockingTab"
import PostsTab from "./posts/postsTab"
import { useEffect, useState } from "react"
import { UserPrivacyType } from "@/lib/utils/types/user.misc/user.misc"
import UserPivacy from "@/lib/classes/User.misc/UserPrivacy"

export default function SettingsTabs({tab}:{
    tab:string
}) {         
    const [userPrivacy,setUserPrivacy] = useState<UserPrivacyType>()
    const {user} = loginInfo()
    const {w} = useSize()
    const tabName = TabsAndLinks.find(
        (link)=>link.tabs.find(ta=>ta.link.split("=")[1] === tab)?.link.split("=")[1] === tab
        )
    
    const router = useRouter()
    useEffect(() => {
        if(!user) return
        const getSettings = async() => {
            const res = await new UserPivacy(user.id).getuserPrivacy()
            if(res?.success) {
                setUserPrivacy(res.data as any)
            }
        }
        getSettings()
    },[user])
    return (
        <div className="lg:p-4">
            {w<=767&&<div className="flex justify-center items-center relative mt-4 p-3 bg-white rounded-t-lg border-b">
                <div className="absolute left-3 text-2xl bg-gray-300/60 p-1 rounded-full active:scale-95 hover-opacity"
                onClick={() => router.push("/profile/settings")}>
                    <FaArrowLeft />
                </div>
                <h2 className="font-bold text-xl">{tabName?.title}</h2>
            </div>}
            {user&&userPrivacy&&
            <div className="max-w-[930px] mx-auto bg-white rounded-lg">
                {tab==="info"&&<InfoTab user={user}/>}   
                {tab==="blocking"&&<BlockingTab />}
                {tab==="posts"&&<PostsTab user={user} settings={userPrivacy.posts}/>}
            </div>}
        </div>
    )
}