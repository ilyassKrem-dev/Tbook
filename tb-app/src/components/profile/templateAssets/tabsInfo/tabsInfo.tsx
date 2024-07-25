import { UserDataType, UserType } from "@/lib/utils/types/user"
import PostsTab from "./posts/postsTab"


export default function TabsInfo({userData,loggedInfo,view}:{
    userData:UserDataType;
    loggedInfo:UserType|null;
    view?:boolean
}) {
    
    return (
        <div className="mt-3">
            <PostsTab view={view}  userData={userData} />
        </div>
    )
}