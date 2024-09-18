import { UserType } from "@/lib/utils/types/user"
import { useEffect, useState } from "react"
import { DefaultPostType } from "@/lib/utils/types/post"
import Posts from "@/lib/classes/Posts"
import PostTemplate from "@/shared/posts/postTemplate"
import SendPost from "@/shared/addPost/sendPost"
import Stories from "../stories/stories"
export default function MiddleHome({userDetails}:{
    userDetails:UserType
}) {
    const [posts,setPosts] = useState<DefaultPostType[]>([])
    useEffect(() => {
        if(!userDetails)  return
        const fetchAllPosts = async() => {
            const res = await Posts.getAllPosts(userDetails.id)
            if(res?.success) {
                setPosts(res.data)
            }
        }
        fetchAllPosts()
    },[userDetails])
    return (
        <div className="flex-1 h-full max-w-[710px] mx-auto flex flex-col gap-5">
            <div className="flex flex-col gap-3 w-full overflow-x-auto h-[300px] max-h-[300px] px-3 py-1">
                <Stories userDetails={userDetails}/>
            </div>
            <div>
                <SendPost user={userDetails}/>
            </div>
            {posts.length>0&&
            <div className="flex flex-col gap-5">
                {posts.map((post,index) => {
                    const {user} = post
                    return (
                        <div key={index} className="w-full">
                            <PostTemplate 
                            post={post as any}
                            user={userDetails}
                            userInfo={user}
                            />
                        </div>
                    )
                })}
            </div>}
                
        </div>
    )
}