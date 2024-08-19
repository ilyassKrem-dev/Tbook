
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import { useEffect, useState } from "react"
import Friend from "@/lib/classes/Friend"
import RightProfileTemplate from "../shared/rightSideProfile/rightProfileTemplate"
import { userFriendsType } from "@/lib/utils/types/user"
import AllLeftSide from "./leftSide/allLeftSide"

export default function AllFriends() {
    const [friends,setFriends] = useState<userFriendsType[]>([])
    const {user} = loginInfo()
    useEffect(() => {
        if(!user) return
        const getRequests = async() => {
                const res = await Friend.getAllFriends(user.id)
                if(res?.data) {
                    setFriends(res.data)
                }
        }
        getRequests()
    },[user])
    return (
        <>
             {user&&
            <div className="h-screen flex md:gap-2 pt-16">
                <div className="md:w-[400px]">
                    <AllLeftSide 
                    setFriends={setFriends} 
                    friends={friends} loggedInfo={user}/>
                </div>
                <RightProfileTemplate />
            </div>}
        </>
    )
}