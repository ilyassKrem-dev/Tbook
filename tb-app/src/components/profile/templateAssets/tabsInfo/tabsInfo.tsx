import { UserDataType, UserType } from "@/lib/utils/types/user"
import PostsTab from "./posts/postsTab"
import { useSearchParams } from "next/navigation";
import FriendsTab from "./friends/friendsTab";
export default function TabsInfo({userData,loggedInfo,view}:{
    userData:UserDataType;
    loggedInfo:UserType|null;
    view?:boolean
}) {
    const searchParams = useSearchParams()
    const tabString = searchParams?.get("sk") as null|"friends"|"about"
    return (
        <div className="mt-3  pb-16">
            {!tabString&&<PostsTab view={view}  userData={userData} />}
            {tabString==="friends"&&<FriendsTab allFreinds={userData.friends} view={view}/>}
        </div>
    )
}