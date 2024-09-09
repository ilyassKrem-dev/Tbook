import { userFriendsType } from "@/lib/utils/types/user"
import { ChangeEvent, useEffect, useState } from "react"
import FriendsHeader from "./freindsHeader";

import FriendFrame from "./friendFrame";


export default function FriendsTab({allFreinds,view,friendsPrivacy}:{
    allFreinds:userFriendsType[];
    view?:boolean;
    friendsPrivacy:boolean
}) {
    const [friends,setFriends] = useState<userFriendsType[]>(allFreinds)
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if(!value) {
            return setFriends(allFreinds)
        }
        return setFriends(allFreinds.filter(friend => {
            const name = friend.friend.name.toLowerCase()
            return name.startsWith(value.toLowerCase())
            }))
        
    }
    
    return (
        <div className="bg-white rounded-lg w-full p-3 px-4">
            <FriendsHeader handleSearch={handleSearch}/>
            {friendsPrivacy&&allFreinds.length>0&&<div className="grid md:grid-cols-2 mt-10 gap-4  grid-cols-1">
                {friends.map((user,index) => {
                    return (
                        <FriendFrame 
                        key={user.id+index} 
                        friendProfile={user} 
                        view={view}
                        setFriends={setFriends}/>
                    )
                })}
            </div>}
            {allFreinds.length===0&&<h1>This user has no friends</h1>}
        </div>
    )
}