import { UserDataType, UserType } from "@/lib/utils/types/user"
import PostsTab from "./posts/postsTab"


export default function TabsInfo({userData,loggedInfo}:{
    userData:UserDataType;
    loggedInfo:UserType|null
}) {
    
    return (
        <div className="mt-3">
            <PostsTab  userData={userData} />
        </div>
    )
}