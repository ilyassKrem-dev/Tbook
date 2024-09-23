import {  StoryType, StoryViewType } from "@/lib/utils/types/storyType"
import Link from "next/link"
import { IoPlay,IoPause  } from "react-icons/io5";
import StoryShow from "../shared/storyShow";
import { useEffect, useState } from "react";
import React from "react";


const StoryMemo = React.memo(StoryShow)
export default function StoryView({storyInfo}:{
    storyInfo:StoryViewType
}) {
    const {user,stories} = storyInfo
    const [storyNumber,setStoryNumber] = useState<number>(0)
    const [time,setTime] = useState<number>(0)
    const [start,setStart] = useState<boolean>(false)
    useEffect(() => {
        let idInter:any
        if(!start) {
            return clearInterval(idInter)
        }
        if(stories.length === 0) return
        if(time==100) {
            if(storyNumber +1 == stories.length) {
                setStoryNumber(0)
            } else {
                setStoryNumber(prev => prev+1)
            }
            
            setTime(0)
            clearInterval(idInter)
        }
        idInter = setInterval(() => {
            setTime(prev => prev+5)
        },1000)
        return () => {
            clearInterval(idInter)}
    },[stories,storyNumber,start,time])
    return (
        <div className="rounded-md h-full w-full bg-black max-w-[450px] mx-auto relative">
            <div className="absolute top-[0.03rem] left-0 right-0 h-[5px] bg-white rounded-tl-md rounded-tr-md  rounded-full"
            style={{width:`${time}%`}}
            >
            </div>
            <div className="absolute top-4 left-2">
                <Link href={`/profile/${user.username}`}  className="flex items-center gap-1">
                    <div className="rounded-full w-[40px] h-[40px]">
                        <img 
                        src={user.image ?? "/profile.jpg"}
                        alt={user.name + " profile"}
                        className="rounded-full border border-blue-400 bg-white object-cover w-full h-full" />
                    </div>
                    <p className="text-white font-medium capitalize text-sm cursor-pointer">{user.name}</p>
                </Link>
                
            </div>
            <div className="absolute top-6 right-4">
                <div className="flex gap-2 items-center">
                    <div className="text-2xl text-white active:scale-95 cursor-pointer hover-opacity" onClick={() => setStart(prev => !prev)}>
                        {start?<IoPause/>:<IoPlay />}
                    </div>
                </div>
            </div>
            <div className="h-full w-full !cursor-default" onClick={() => setStart(prev => !prev)}>
                {<StoryMemo story={stories[storyNumber]}/>}
            </div>
        </div>
    )
}