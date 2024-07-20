import { FullUserType, UserType } from "@/lib/utils/types/user"
import { getStringDate } from "@/lib/utils/simpleUtils"
import { MdCake, MdOutlineAccessTimeFilled } from "react-icons/md";

import PostHeader from "@/shared/posts/postHeader";
import PostFooter from "@/shared/posts/postFooter";
import PostBtns from "@/shared/posts/postBtns";
import { useEffect, useState } from "react";
import User from "@/lib/classes/User";
import PostTemplate from "@/shared/posts/postTemplate";
import { PostType } from "@/lib/utils/types/post";
import { BsDot } from "react-icons/bs";
export default function RightSide({userInfo,user}:{
    userInfo:FullUserType;
    user:UserType | null
}) {
    const [posts,setPosts] = useState<PostType[]>([])
    const {day,month,year} = getStringDate(userInfo.birthdate)
    
    useEffect(() => {
        const getPosts = async() => {
            const res = await User.getUserPosts(userInfo.id)
            if(res?.success) {
                setPosts(res.data)
            }
        }
        getPosts()
    },[userInfo.id])

    return (
        <div className="flex gap-3 w-full flex-col">
            <div className="px-4 py-3 rounded-lg bg-white text-lg font-bold sm-shadow">
                <h1>Posts</h1>
            </div>
            {posts.length>0&&
            posts.map((post,index) => {
                return (
                    <PostTemplate key={index} userInfo={userInfo} user={user} post={post}/>
                )
            })}
            <div className="px-4 py-3 rounded-lg bg-white  sm-shadow">
                <div className="flex gap-3  items-center">
                    <div className="w-[40px] h-[40px] rounded-full">
                        <img 
                        src={userInfo.image ? userInfo.image: "/profile.jpg"} 
                        alt={`${userInfo.name} image`}
                        className="rounded-full w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-semibold capitalize text-base">{userInfo.name}</h2>
                        <div className="text-xs text-gray-500/70 flex items-center">
                            {month} {day}, {year} <BsDot />
                            <MdOutlineAccessTimeFilled className="text-base"/> 
                        </div>
                    </div> 
                </div>
                <div className="flex gap-4  items-center flex-col">
                    <div className="bg-blue-500 p-2 rounded-full">
                        <MdCake className="text-white text-3xl"/>
                    </div>
                    <p className="font-semibold text-lg">Born on {month} {day}, {year}</p>
                </div>
                <PostBtns />
                <PostFooter user={user}/>
            </div>
        </div>
    )
}