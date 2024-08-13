
import Friend from "@/lib/classes/Friend"
import { useEffect, useState } from "react"
import { FriendsReqType } from "@/lib/utils/types/friend"
import LoadingAnimation from "@/shared/spinner"
import { UserType } from "@/lib/utils/types/user"
import FriendReqSec from "./assets/friendRequestSec"
import OtherPeople from "./otherPeople"
export default function FriendsRight({user}:{
    user:UserType
}) {
    const [loading,setLoading] = useState<boolean>(true)
    const [friendsR,setFriendsR] = useState<FriendsReqType>({
        others:[],
        requests:[]
    })
    useEffect(() => {
        if(!user) return
        const getAll = async () => {
            const res = await Friend.getAllFriendsAndRequest(user.id)
            if(res?.success) {
                setLoading(false)
                setFriendsR(res.data as any)
            }
        }   
        getAll()
    },[user])
 
    return (
        <div className="h-full pt-10">
            {!loading&&
            <div className="flex gap-3 flex-col">
                {friendsR.requests.length>0
                &&
                <FriendReqSec 
                requests={friendsR.requests} 
                loggedInfo={user}
                setFriendsR={setFriendsR}/>}
                <OtherPeople 
                loggedInfo={user}
                others={friendsR.others}
                setFriendsR={setFriendsR}/>
            </div>}
            {loading&&<div className="h-full flex justify-center items-center">
                <LoadingAnimation />
            </div>}
        </div>
    )
}