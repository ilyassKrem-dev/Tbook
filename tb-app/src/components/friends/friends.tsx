import TopNav from "@/shared/navTop/topNav";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import FriendsLeftSide from "./assets/leftSide/home/friendsLeft";
import FriendsRight from "./assets/rightSide/home/FriendsRight";
export default function Friends() {
    const {user,loginStatus} = loginInfo()
    return (
        <>
            {user&&
            <div className="h-screen flex  gap-10 pt-16">
                <div className="w-[400px]">
                    <FriendsLeftSide />
                </div>
                <div className="flex-1 h-full">
                    <div className="p-3 h-full">
                        <FriendsRight user={user}/>
                    </div>
                </div>
            </div>}
        </>
    )
}