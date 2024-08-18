
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import FriendsLeftSide from "./leftSide/friendsLeft";
import FriendsRight from "./rightSide/FriendsRight";
export default function Friends() {
    const {user,loginStatus} = loginInfo()
    return (
        <>
            {user&&
            <div className="h-screen flex  md:gap-10 pt-16">
                <div className="md:w-[400px]">
                    <FriendsLeftSide />
                </div>
                <div className="flex-1 h-full mt-4 md:mt-0">
                    <div className="p-2 md:p-3 h-full">
                        <FriendsRight user={user}/>
                    </div>
                </div>
            </div>}
        </>
    )
}