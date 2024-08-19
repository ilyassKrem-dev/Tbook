
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import { useEffect, useState } from "react"
import { OtherType } from "@/lib/utils/types/friend"
import Friend from "@/lib/classes/Friend"
import RightProfileTemplate from "../shared/rightSideProfile/rightProfileTemplate"
import SuggestionLeft from "./leftSide/suggesLeft"



export default function SuggestionFriends() {
    const [others,setOthers] = useState<OtherType[]>([])
    const {user,loginStatus} = loginInfo()
    useEffect(() => {
        if(!user) return
        const getRequests = async() => {
            const res = await Friend.getAllFriendsAndRequest(user.id)
            if(res?.success) {
                setOthers((res.data as any).others)
            }
        }
        getRequests()
    },[user])
    return (
        <>
             {user&&
            <div className="h-screen flex md:gap-2 pt-16">
                <div className="md:w-[400px]">
                    <SuggestionLeft others={others} setOthers={setOthers} loggedInfo={user}/>
                </div>
                <RightProfileTemplate />
            </div>}
        </>
    )
}