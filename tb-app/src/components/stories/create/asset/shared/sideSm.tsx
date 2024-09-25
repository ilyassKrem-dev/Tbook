
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { IoText } from "react-icons/io5";
import { colors } from "../../misc/misc";
import { SideSmType } from "./sideType";
import { CiShare1 } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";


export default function SideSm(
    {
        textStory,
        setTextStory,
        setShowEmoji,
        showEmoji,
        handleClickEmoji,
        selected,
        handleColorClick,
        story,setShow,handleSave
    }:SideSmType
) {

    const [tab,setTab] = useState<string>("")
    const handleClick = (value:string) => {
        setTab(tab === value ? "" : value)
    }
    return (
        <div className="fixed bottom-0 right-0 left-0  z-40">
            <div className="w-full h-full flex flex-col-reverse gap-1 bg-white">
                <div className="flex gap-3 items-center   rounded-t-md border-t border-black/3 justify-center p-1">
                    <button className={`text-2xl p-3  transition-all duration-300 active:scale-95 px-5 rounded-lg ${tab === "text" ? "bg-blue-400 text-white":""}`} onClick={() => handleClick("text")}>
                        <IoText />
                    </button>
                    <button className={`text-2xl   transition-all duration-300 active:scale-95  rounded-lg w-[55px] h-[50px] p-[0.1rem] px-4 ${tab === "textC" ? "bg-blue-400 text-white":""}`} onClick={() => handleClick("textC")}>
                        <img src="/blackWhite.svg" alt="" className="w-full h-full" />
                    </button>
                    {story=="text"&&
                    <button className={`text-2xl   transition-all duration-300 active:scale-95  rounded-lg  p-2 px-4 ${tab === "bgC" ? "bg-blue-400 text-white":""}`} onClick={() => handleClick("bgC")}>
                        <img src="/colors.png" alt="" className="w-full h-full" />
                    </button>}
                    <button className={`text-2xl p-3  transition-all duration-300 active:scale-95 px-5 rounded-lg ${tab === "share" ? "bg-blue-400 text-white":""}`} onClick={() => handleClick("share")}>
                        <CiShare1 />
                    </button>
                </div>

                {tab&&
                <div className="border-t border-t-black/20">
                    {tab=="text"&&
                    <div className="pt-3 flex flex-col gap-1 justify-center items-center relative">
                        <h6 className="text-base text-black/70 font-bold">Text</h6>
                        <div className=" flex justify-center items-center">
                            <textarea
                                name="story-text"
                                id="story-text"
                                className="rounded-md border-black/50 resize-none focus-within:outline-none  h-[60px]  p-2 placeholder:text-black/70 focus-within:border-black/70 relative  border w-[280px]"
                                value={textStory}
                                onChange={(e) => setTextStory(e.target.value)}
                                placeholder="Start typing"
                            />
                                    
                            <div className="absolute bottom-2 right-1 z-40">
                                <div className="relative">
                                    <div className="text-2xl cursor-pointer active:scale-95 hover-opacity">
                                        <HiOutlineFaceSmile 
                                        onClick={() => setShowEmoji(prev => !prev)}/>

                                    </div>
                                    {showEmoji&&<div className="absolute bottom-6 right-0">
                                        <EmojiPicker
                                        reactionsDefaultOpen={true} 
                                        onEmojiClick={handleClickEmoji} 
                                        lazyLoadEmojis
                                        searchDisabled
                                        
                                        height={"350px"}/>
                                    </div>}
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    }

                    {tab==="textC"&&
                    <div className="  p-3 flex justify-center items-center flex-col gap-1">
                        <h6 className="text-base text-black/70 font-bold">Text colors</h6>
                        <div className="flex gap-3 flex-wrap mt-2">
                            <div 
                            onClick={() => handleColorClick("white","textColor")}
                            className={`rounded-full p-[0.7rem] cursor-pointer ${selected.textColor === "white" ? "border-blue-400 border-4":"border-4 border-black/30"}`}
                            style={{backgroundColor:"white"}} />
                            <div 
                            onClick={() => handleColorClick("black","textColor")}
                            className={`rounded-full p-[0.7rem] cursor-pointer ${selected.textColor === 'black' ? "border-blue-400 border-4":"border-4 border-transparent"}`}
                            style={{backgroundColor:"black"}} />
                            
                        </div>
                    </div>}
                    {story=="text"&&tab=="bgC"&&<div className=" p-3 flex justify-center items-center flex-col gap-1">
                        <h6 className="text-base text-black/70 font-bold">Backgrounds</h6>
                        <div className="flex gap-3 flex-wrap mt-2">
                            {colors.map((color,index) => {
                                return (
                                    <div 
                                    key={index}
                                    onClick={() => handleColorClick(color,"bgColor")}
                                    className={`rounded-full p-[0.7rem] cursor-pointer ${selected.bgColor === color ? "border-blue-400 border-4":"border-4 border-transparent"}`}
                                    style={{backgroundColor:color}} />
                                )
                            })}
                            
                        </div>
                    </div>}
                    {tab=="share"&&<div className="p-3 flex justify-between items-center">
                        <button className="rounded-full p-2 bg-gray-300/70 hover:bg-gray-300 cursor-pointer active:scale-95 transition-all duration-300 text-2xl" onClick={() => setShow(true)}>
                                <IoMdSettings />
                        </button>
                        <button 
                        className={`p-2 bg-blue-400 rounded-md px-10 font-semibold active:scale-95  transition-all duration-300 text-white  relative`}
                        onClick={handleSave}>
                            <span className="relative z-10 cursor-pointer">Share story
                            </span>
                        </button>
                
                    </div>}
                </div>}
            </div>
        </div>
    )
}