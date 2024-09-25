"use client"

import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import Story from "@/lib/classes/story/Story"
import {  useSize } from "@/lib/utils/hooks"
import { UserStoryType } from "@/lib/utils/types/storyType"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { FaPlus } from "react-icons/fa6"

type allStoryType = {
    own:UserStoryType|null,
    others:UserStoryType[]
}

export default function LeftSideMainStory() {
    const {user} = loginInfo()
    const [allStories,setAllStories] = useState<allStoryType|null>(null)
    useEffect(() => {
        if(!user) return
        const getStories = async() => {
            const res = await new Story(user.id).getStories()
            if(res?.success) {
                setAllStories(res.data as any)
            } else {
                setAllStories({
                    own:null,
                    others:[]
                })
            }
        }
        getStories()
    },[user])
    const {w} = useSize()
    const divStoryBg = useMemo(() => {
        return (
            <div className="p-3 py-5 overflow-y-auto h-full custom-scrollbar">
                    <h1 className="font-bold text-2xl">Stories</h1>
                    <div className="flex flex-col gap-3 mt-5 ">
                        <h2 className="font-semibold text-lg">Your story</h2>
                        <div className="flex flex-col gap-2">

                            {!allStories&&<div className="flex gap-2 items-center cursor-pointer">
                                <div className=" bg-gray-300 rounded-full text-lg p-7 animate-pulse">
                                    
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="font-semibold cursor-pointer w-[50px] bg-gray-300 animate-pulse h-[10px] rounded-full"/>
                                    <div className="text-black/60 text-xs cursor-pointer w-[100px] bg-gray-300 animate-pulse h-[10px] rounded-full"/>
                                </div>
                            </div>}

                            {allStories&&allStories.own&&
                            <Link href={`/stories/${allStories.own.username}`}  className="flex gap-2 items-center cursor-pointer">
                                <div className=" bg-gray-300 rounded-full text-lg w-[58px] h-[58px] border-blue-500 border-2">
                                    <img 
                                    src={allStories.own.image ?? "/profile.jpg"} 
                                    alt={`${allStories.own.name} profile` }
                                    className="rounded-full object-cover bg-white  h-full w-full border-blue-500 border-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-semibold cursor-pointer">{allStories.own.name}</h5>
                                </div>
                               
                            </Link>}

                            <Link href={"/stories/create"} className="flex gap-2 items-center cursor-pointer">
                                <div className="text-blue-500 bg-blue-100/90 rounded-full text-lg p-5">
                                    <FaPlus />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="font-semibold cursor-pointer">Create a story</h5>
                                    <p className="text-black/60 text-xs cursor-pointer">Share a photo or write something</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    
                    {allStories&&allStories.others.length>0&&
                
                    <div className="flex flex-col gap-3 mt-5">
                        <h2 className="font-semibold text-lg">Other stories</h2>
                        {allStories.others.map((userInfo,index) => {
                            const {id,name,username,image} = userInfo
                            return (
                                <Link href={`/stories/${username}`} key={index} className="flex gap-2 items-center cursor-pointer">
                                    <div className=" bg-gray-300 rounded-full text-lg w-[58px] h-[58px] border-blue-500 border-2">
                                        <img 
                                        src={image ?? "/profile.jpg"} 
                                        alt={`${name} profile` }
                                        className="rounded-full object-cover bg-white  h-full w-full border-blue-500 border-2" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h5 className="font-semibold cursor-pointer">{name}</h5>
                                    </div>
                                
                                </Link>
                            )
                        })}
                    </div>}
            </div>
        )
    },[allStories,user])
    const divStorySm = useMemo(() => {
        return (
            <div className="flex flex-col gap-2 p-3 items-start static z-40">
            <h1 className="font-bold text-2xl">Stories</h1>
            <div className="px-4 relative flex items-center gap-3 ">
                <Link href={"/stories/create"} className="flex gap-2 items-center cursor-pointer justify-center group rounded-full active:scale-95">
                    <div className="text-blue-500 bg-blue-100/90 rounded-full text-lg p-4">
                        <FaPlus />
                    </div>
                    <div className="absolute top-12 bg-black/70 rounded-md text-white font-semibold text-xs p-1 w-[100px] z-40 group-hover:block delay-300 text-center hidden transition-all duration-300">
                        Create story
                    </div>
                </Link>
                <div className=" overflow-x-scroll custom-scrollbar flex gap-3 items-center">
                    {allStories&&allStories.own&&
                    <Link href={`/stories/${allStories.own.username}`}  className="flex gap-2 items-center cursor-pointer">
                        <div className=" bg-gray-300 rounded-full text-lg w-[50px] h-[50px] border-blue-500 border-2">
                            <img 
                            src={allStories.own.image ?? "/profile.jpg"} 
                            alt={`${allStories.own.name} profile` }
                            className="rounded-full object-cover bg-white  h-full w-full border-blue-500 border-2" />
                        </div>
                    </Link>}
                    {allStories&&allStories.others.length>0&&
                    <div className="flex items-center gap-3">
                        {allStories.others.map((userInfo,index) => {
                            const {id,name,image,username} = userInfo
                            return (
                                <Link href={`/stories/${username}`} key={index} className="flex gap-2 items-center cursor-pointer">
                                    <div className=" bg-gray-300 rounded-full text-lg w-[50px] h-[50px] border-blue-500 border-2">
                                        <img 
                                        src={image ?? "/profile.jpg"} 
                                        alt={`${name} profile` }
                                        className="rounded-full object-cover bg-white  h-full w-full border-blue-500 border-2" />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>}
                </div>

            </div>
        </div>
        )
    },[allStories,user])
    return (
        <>
            {user&&
            <div className="fixed top-14 left-0 right-0 bg-white border-r border-r-black/10 shadow-lg md:w-[350px] md:right-auto md:bottom-0 h-fit md:h-auto">
                {w>767&&
                divStoryBg}

                {w<=767&&divStorySm}
            </div>}
        </>
    )
}