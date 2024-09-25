import {  StoryType, StoryViewType } from "@/lib/utils/types/storyType"
import Link from "next/link"
import { IoPlay,IoPause  } from "react-icons/io5";
import StoryShow from "../shared/storyShow";
import { useEffect, useState } from "react";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


const StoryMemo = React.memo(StoryShow)
export default function StoryView({storyInfo}:{
    storyInfo:StoryViewType
}) {
    const {user,stories} = storyInfo
    const [storyNumber,setStoryNumber] = useState<number>(0)
    const [time,setTime] = useState<number>(0)
    const [start,setStart] = useState<boolean>(true)
    useEffect(() => {
        if(stories.length==0) return
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
    const handleArrows = (dirc:string) => {
        if(dirc === "right") {
            setTime(0)
            setStoryNumber(prev => stories.length == storyNumber+1 ? 0 : prev + 1)
        } else {
            setTime(0)
            setStoryNumber(prev => storyNumber == 0 ? stories.length-1 : prev - 1)
        }
    }
    return (
        <>
            {stories.length>0&&<div className="rounded-md h-full w-full bg-black max-w-[450px] mx-auto relative">
                <div className="absolute top-[0.35rem] left-0 right-0 h-[5px] flex items-center gap-[0.6px]"
                >
                    {[...Array(stories.length)].map((_,index) => {
                        return (
                            <div 
                            key={index} 
                            className={` rounded-full h-full w-full  ${index==0 ?"rounded-l-none" :"rounded-full"} bg-black/30 relative`}
                            >
                                <div 
                                className={`absolute top-0 right-0 bottom-0 left-0 
                                ${index==0 ?"rounded-l-none rounded-full" :"rounded-full"} 
                                ${index === storyNumber || index <storyNumber?"bg-white":""}
                                `}
                                style={{
                                width:`
                                ${index==storyNumber
                                    ?time:
                                    index<storyNumber
                                    ?100
                                    :0}%`,
                                    transition: 'width 0.8s ease'
                                }} />
                            </div>
                        )
                    })}
                

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
                <div className="h-full w-full !cursor-default  flex justify-center items-center flex-col group/arrows" >
                    <div className="overflow-hidden flex justify-center items-center flex-col w-full h-full" onClick={() => setStart(prev => !prev)}>
                        {<StoryMemo story={stories[storyNumber]}/>}
                    </div>
                    {stories.length>0&&<>
                        <div className="bg-white rounded-full p-2 text-lg text-black absolute left-2 w-fit h-fit cursor-pointer active:scale-95 group-hover/arrows:block hidden transition-all duration-300" onClick={() => handleArrows("left")}>
                            <FaArrowLeft />
                        </div>
                        <div className="bg-white rounded-full p-2 text-lg text-black absolute right-2 w-fit h-fit cursor-pointer active:scale-95 group-hover/arrows:block hidden transition-all duration-300"onClick={() => handleArrows("right")} >
                            <FaArrowRight />
                        </div>
                    
                    </>}
                </div>
            
            </div>}
            {stories.length===0&&<div className="flex justify-center items-center text-xl">
                This user didn't share any story
            </div>}
        </>
        
    )
}