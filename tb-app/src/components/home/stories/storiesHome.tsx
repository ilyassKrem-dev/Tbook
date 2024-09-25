import Story from "@/lib/classes/story/Story"
import { UserType } from "@/lib/utils/types/user"
import Link from "next/link"
import { useEffect, useState } from "react"
import {  FaArrowRight, FaPlus } from "react-icons/fa6"
import { StoryHomeType } from "@/lib/utils/types/storyType"
import StoryShow from "../../stories/shared/storyShow"
import { useSize } from "@/lib/utils/hooks"

export default function StoriesHome({userDetails}:{
    userDetails:UserType;

}) {
    const [stories,setStories] = useState<StoryHomeType[]|null>(null)
    useEffect(() => {
        const getStories = async() => {
            const res =await new Story(userDetails.id).getHomeStories()
            if(res?.success) {
                setStories(res.data)

            } else {
                setStories([])
            }
        }
        getStories()
    },[userDetails])

    const {w} = useSize()
    return (
        <>
            <>
                {userDetails.image&&
                <Link href={"/stories/create"} className="h-full rounded-xl flex flex-col max-w-[150px] bg-white hover:bg-black/70 transition-all duration-300 active:scale-95 cursor-pointer group shadow-[0px_0px_5px_1px_rgba(0,0,0,0.4)] sm:flex-1 w-[110px] min-[351px]:w-[100px] max-[350px]:w-[90px]">
                    <div className="flex-1 rounded-t-xl overflow-hidden">
                        <img 
                        src={userDetails.image ?? "/profile.jpg"} 
                        alt={`${userDetails.name} image`} 
                        className="w-full h-full object-cover bg-white rounded-t-xl group-hover:opacity-70 group-hover:scale-105 transition-all duration-300 "/>
                    </div>
                    
                    <div className="relative flex items-center justify-center h-[50px] bg-white rounded-b-xl group-hover:opacity-80">
                            <p  className="mt-3 font-medium text-sm cursor-pointer">Create story</p>
                            <div className="absolute rounded-full bg-white p-1 text-lg bottom-7 group-hover:opacity-80 transition-all duration-300">
                                <div className="bg-blue-600 text-white text-xl rounded-full p-2">
                                    <FaPlus />
                                </div>
                                
                            </div>
                    </div>
                </Link> }
                {!userDetails.image&&
                <Link href={"/stories/create"} className="h-full rounded-xl flex flex-col max-w-[150px]  bg-white group shadow-[0px_0px_5px_1px_rgba(0,0,0,0.4)] hover:bg-black/70 transition-all duration-300 cursor-pointer flex-1">
                    <div className="relative flex items-center justify-center flex-col h-full bg-white rounded-xl group-hover:opacity-80">
                            <div className="rounded-full bg-white p-1 text-lg bottom-7">
                                <div className="bg-blue-600 text-white text-xl rounded-full p-2">
                                    <FaPlus />
                                </div>
                                
                            </div>
                            <p  className="mt-1 font-semibold text-sm cursor-pointer">Create story</p>
                            
                    </div>
                </Link>}
                {!stories&&
                [...Array(2)].map((_,index) => {
                    return (
                    <div key={index} className="h-full rounded-xl flex flex-col max-w-[150px] bg-white  transition-all duration-300 active:scale-95 cursor-pointer group shadow-[0px_0px_5px_1px_rgba(0,0,0,0.4)] relative min-[351px]:w-[100px] sm:w-[150px] max-[350px]:w-[90px]">
                        <div className="absolute top-2 left-2 rounded-full bg-gray-400/80 p-5 animate-pulse" />
                        <div className="flex-1 rounded-t-xl overflow-hidden bg-gray-300/60   rounded-md animate-pulse" />
                    </div> 
                    )
                })
               }
                {
                    stories&&stories.length>0&&
                    (
                        w>600?stories.map((storyInfo,index) => {
                            const {story,user} = storyInfo
                         
                            return (
                                <Link key={index} href={`/stories/${user.username}`} className="h-full rounded-xl flex flex-col max-w-[150px] bg-white hover:bg-black/70 transition-all duration-300 active:scale-95 cursor-pointer group shadow-[0px_0px_5px_1px_rgba(0,0,0,0.4)] relative ">
                                    <div className="absolute top-2 left-2 rounded-full bg-gray-400/80 w-[40px] h-[40px] z-20">
                                        <img 
                                        src={user.image ?? "/profile.jpg"} 
                                        alt={`${user.name} image`} 
                                        className="w-full rounded-full object-cover bg-white border h-full" />
                                    </div>
                                    <div className="flex-1 rounded-xl overflow-hidden max-w-[150px] w-[100px] sm:w-[150px] ">
                                        <StoryShow story={story} location="home"/>
                                    </div>
                                </Link>
                            )
                        })
                        :
                        stories.slice(0,2).map((storyInfo,index) => {
                            const {story,user} = storyInfo
                            
                            return (
                                <Link key={index} href={`/stories/${user.username}`} className="h-full rounded-xl flex flex-col max-w-[150px] bg-white hover:bg-black/70 transition-all duration-300 active:scale-95 cursor-pointer group shadow-[0px_0px_5px_1px_rgba(0,0,0,0.4)] relative min-[351px]:w-[100px] sm:w-[150px] max-[350px]:w-[90px]">
                                    <div className="absolute top-2 left-2 rounded-full bg-gray-400/80 w-[40px] h-[40px] z-20">
                                        <img 
                                        src={user.image ?? "/profile.jpg"} 
                                        alt={`${user.name} image`} 
                                        className="w-full rounded-full object-cover bg-white border h-full" />
                                    </div>
                                    <div className="flex-1 rounded-xl overflow-hidden max-w-[150px]  ">
                                        {/* <StoryShow story={story}/> */}
                                    </div>
                                </Link>
                            )
                        })
                        )
                }
               
        
            </>
           
        </>
    )
}