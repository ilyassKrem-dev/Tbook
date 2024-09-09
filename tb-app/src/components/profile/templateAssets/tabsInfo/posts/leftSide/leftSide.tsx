import { UserDataType } from "@/lib/utils/types/user"

import Intro from "./assets/intro"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import FriendsSide from "./assets/friendsSide";
export default function LeftSide({userData,view,friendsPrivacy}:{
    userData:UserDataType;
    view?:boolean;
    friendsPrivacy:boolean
}) {
    const userInfo = userData.user
    const {user} = loginInfo()



    return (
        <div className="flex flex-col gap-2 flex-1 w-full lg:max-w-[490px] lg:sticky top-0 bottom-0 ">
            <Intro userInfo={userInfo} user={user} view={view}/>
            {friendsPrivacy&&userData.friends.length>0&&<FriendsSide friends={userData.friends.slice(0,9)}/>}
        </div>
    )
}