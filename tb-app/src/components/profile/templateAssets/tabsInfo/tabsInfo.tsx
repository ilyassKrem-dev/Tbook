import { UserDataType } from "@/lib/utils/types/user"
import PostsTab from "./posts/postsTab"


export default function TabsInfo({userData}:{
    userData:UserDataType
}) {
    
    return (
        <div className="mt-3">
            <PostsTab  userData={userData}/>
        </div>
    )
}