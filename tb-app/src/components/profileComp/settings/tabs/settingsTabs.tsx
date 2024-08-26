import { useSize } from "@/lib/utils/hooks"
import InfoTab from "./info/infoTab"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import { FaArrowLeft } from "react-icons/fa6"
import { TabsAndLinks } from "../misc/tabs&links"
import { useRouter } from "next/navigation"


export default function SettingsTabs({tab}:{
    tab:string
}) {         
    const {user} = loginInfo()
    const {w} = useSize()
    const tabName = TabsAndLinks.find(
        (link)=>link.tabs.find(tab=>tab.link.split("=")[1])?.link.split("=")[1] === tab
        )
    const router = useRouter()
    return (
        <div className="lg:p-4">
            {w<=767&&<div className="flex justify-center items-center relative mt-4 p-3 bg-white rounded-t-lg border-b">
                <div className="absolute left-3 text-2xl bg-gray-300/60 p-1 rounded-full active:scale-95 hover-opacity"
                onClick={() => router.push("/profile/settings")}>
                    <FaArrowLeft />
                </div>
                <h2 className="font-bold text-xl">{tabName?.title}</h2>
            </div>}
            {user&&
            <div className="max-w-[930px] mx-auto bg-white rounded-lg">
                {tab==="info"&&<InfoTab user={user}/>}    
            </div>}
        </div>
    )
}