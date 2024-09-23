"use client"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import Story from "@/lib/classes/story/Story";
import { useEffect, useState } from "react"
import {  StoryViewType } from "@/lib/utils/types/storyType";
import StoryView from "./[username]/storyView";
import { useRouter } from "next/navigation";


export default function Stories({username}:{
    username:string
}) {
    const [stories,setStories] = useState<StoryViewType>();
    const {user} = loginInfo()
    const router = useRouter()
    useEffect(() => {
        if(!user) return
        const getStories = async() => {
            const res = await new Story(user.id).getUsernameStories(username)
            if(res?.success) {
                if(res.data.length===0) {
                    return router.push("/stories")
                }
                setStories(res.data as any)
            }
        }
        getStories()
    },[username,user])
   
    return (
        <div className="p-5 pt-20 sm:px-20 sm:py-20 pb-6 md:py-20 md:pr-20 md:pl-5 lg:p-20 flex justify-center items-center h-full max-h-[900px] min-h-[500px] ">
            {stories&&
            (<StoryView storyInfo={stories} />)}
        </div>
    )
}