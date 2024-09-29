"use client"
import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper"
import Posts from "@/lib/classes/Posts"
import { PostType } from "@/lib/utils/types/post"
import { PostUserType } from "@/lib/utils/types/user"
import TopNav from "@/shared/navTop/topNav"
import PostTemplate from "@/shared/posts/postTemplate"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { useEffect, useState } from "react"

type postType = {
    post:PostType;
    userInfo:PostUserType
}

const PostTemplatememo = React.memo(PostTemplate)
export default function ProfilePosts({postId}:{
    postId:string
}) {
    const {user} = useLoginInfo()

    const [post,setPost] = useState<postType>()
    const router = useRouter()
    const pathname = usePathname();
    const pathString = pathname?.split("/")
    useEffect(() => {
        if(!user || !pathString) return
        const getPost = async() => {
            const res = await Posts.getPost(pathString[2],postId)
            if(res?.success) {
                setPost(res.data)
            } else {
                router.push(pathString[0]) 
            }
        }
        getPost()
    },[user,postId,router])

    return (

        <>
            {user&&post&&
            <div>
                <TopNav />
                <div className="max-w-[900px] mx-auto pt-16">
                    <PostTemplatememo post={post.post} user={user} userInfo={post.userInfo}/>
                </div>
                
            </div>}
        </>
    )
}