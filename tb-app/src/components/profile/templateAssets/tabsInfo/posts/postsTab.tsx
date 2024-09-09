import { UserDataType } from "@/lib/utils/types/user"
import SendPost from "../../../../../shared/addPost/sendPost"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import LeftSide from "./leftSide/leftSide"
import RightSide from "./rightSide/rightSide"

export default function PostsTab({userData,view,friendsPrivacy}:{
    userData:UserDataType;
    view?:boolean;
    friendsPrivacy:boolean
}) {
    const userInfo = userData.user
    const {user} = loginInfo()
    const checkUser = userInfo.id == user?.id
    return (
        <>
            <div className="flex gap-3 bg-gray-1 items-start pb-12 flex-col lg:flex-row">
                <LeftSide userData={userData} view={view} friendsPrivacy={friendsPrivacy}/>
                <div className="flex flex-col gap-3 flex-1 w-full">
                    {!view&&user&&checkUser&&
                    <SendPost user={user}/>}
                    <RightSide userInfo={userInfo} user={user}/>
                </div>
            </div>
        </>
    )
}