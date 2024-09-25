import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper"
import RequestLeft from "./leftSide/requestLeft"
import { useEffect, useState } from "react"
import { FriendType, OtherType } from "@/lib/utils/types/friend"
import Friend from "@/lib/classes/Friend"
import RightProfileTemplate from "../shared/rightSideProfile/rightProfileTemplate"

export default function RequestFri() {
    const [requests,setRequests] = useState<FriendType[]>([])
    const {user,loginStatus} = useLoginInfo()
    useEffect(() => {
        if(!user) return
        const getRequests = async() => {
            const res = await Friend.getAllFriendsAndRequest(user.id)
            if(res?.success) {
                setRequests((res.data as any).requests)
            }
        }
        getRequests()
    },[user])
    return (
        <>
             {user&&
            <div className="h-screen flex md:gap-2 pt-16">
                <div className="md:w-[400px]">
                    <RequestLeft 
                    loggedInfo={user} 
                    requests={requests}
                    setRequests={setRequests}/>
                </div>
                <RightProfileTemplate />
            </div>}
        </>
    )
}