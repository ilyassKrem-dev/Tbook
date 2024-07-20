import { UserDataType } from "@/lib/utils/types/user"

import Intro from "./assets/intro"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"


export default function LeftSide({userData}:{
    userData:UserDataType
}) {
    const userInfo = userData.user
    const {user} = loginInfo()
    return (
        <div className="flex flex-col gap-2 flex-1 w-full lg:max-w-[490px] sticky top-0 bottom-0 ">
            <Intro userInfo={userInfo} user={user}/>
        </div>
    )
}