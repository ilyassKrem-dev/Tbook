import { UserDataType, UserType } from "@/lib/utils/types/user"
import PostsTab from "./posts/postsTab"
import { useSearchParams } from "next/navigation";
import FriendsTab from "./friends/friendsTab";
import { useEffect, useState } from "react";
import Profile from "@/lib/classes/Profile";
export default function TabsInfo({userData,loggedInfo,view}:{
    userData:UserDataType;
    loggedInfo:UserType|null;
    view?:boolean
}) {
    const [friendsPrivacy,setFriendsPrivacy] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const tabString = searchParams?.get("sk") as null|"friends"|"about"
    useEffect(() => {
        if(!loggedInfo) return
        if(loggedInfo.id === userData.user.id) return setFriendsPrivacy(true)
        const checkFriendsPrivacy = async() => {
            const res = await Profile.checkFriendsPrivacy(loggedInfo.id,userData.user.id)
            if(res?.success) {
                 return setFriendsPrivacy(res.data)
            } 
        
        }
        checkFriendsPrivacy()
    },[loggedInfo,userData])
    return (
        <div className="mt-3  pb-16">
            {!tabString&&<PostsTab view={view}  userData={userData} friendsPrivacy={friendsPrivacy} />}
            {tabString==="friends"&&<FriendsTab allFreinds={userData.friends} view={view} friendsPrivacy={friendsPrivacy}/>}
        </div>
    )
}