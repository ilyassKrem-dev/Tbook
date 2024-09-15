import { UserDataType } from "@/lib/utils/types/user";
import AboutSideTabs from "./aboutSideTab";
import { MdOutlineWork } from "react-icons/md";
import { useEffect, useState } from "react";
import UserInfo from "@/lib/classes/User.misc/UserInfo";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import OverView from "./tabs/overview/overView";
export default function AboutTab({view,userData,aboutTab}:{
    view?:boolean;
    userData:UserDataType;
    aboutTab:string
}) {
    const [moreInfo,setMoreInfo] = useState<MoreInfoType>()
    const {user} = loginInfo()
    useEffect(() => {
        if(!user) return
        const getMoreInfo = async() => {
            const res = await UserInfo.getMoreInfo(user.id)
            if(res?.success) {
                setMoreInfo(res.data)
            }
        }
        getMoreInfo()
    },[user])
   
    return (
        <>
            {moreInfo&&<div className="bg-white rounded-lg w-full border border-black/10">
                <div className="flex-col flex  md:flex-row gap-3">
                    <AboutSideTabs aboutTab={aboutTab}/>
                    <OverView moreInfo={moreInfo} view={view} user={user}/>
                </div>

            </div>}
        
        </>
    )
}