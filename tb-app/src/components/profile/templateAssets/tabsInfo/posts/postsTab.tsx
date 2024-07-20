import { UserDataType } from "@/lib/utils/types/user"
import SendPost from "../../../../../shared/addPost/sendPost"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import LeftSide from "./leftSide/leftSide"
import RightSide from "./rightSide/rightSide"

export default function PostsTab({userData}:{
    userData:UserDataType
}) {
    const userInfo = userData.user
    const {user} = loginInfo()
    return (
        <>
            <div className="flex gap-3 bg-gray-1 items-start pb-12 flex-col lg:flex-row">
                <LeftSide userData={userData}/>
                <div className="flex flex-col gap-3 flex-1 w-full">
                    {user&&userInfo.id === user.id&&
                    <SendPost user={user}/>}
                    <RightSide userInfo={userInfo} user={user}/>
                </div>
            </div>
        </>
    )
}