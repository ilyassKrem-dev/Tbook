import {  useState } from "react"
import { motion,AnimatePresence } from "framer-motion"
import { removeOverlay, useSize } from "@/lib/utils/hooks"
import { colors } from "../../misc/misc";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import OverlayTemplate from "@/components/profileComp/settings/assets/shared/overlayTemplate";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { useUploadThing } from "@/lib/utils/uploadthing";
import Story from "@/lib/classes/story/Story";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import { useRouter } from "next/navigation";
import SideSm from "./sideSm";
import { SideType } from "./sideType";
export default function TextSide(
    {selected,setSelected,textStory,setTextStory,setStory,story,photoStory,choice,setShow}
    :SideType) {
    const [progress,setProgress] = useState<number>(0)
    const router = useRouter()
    const {startUpload} = useUploadThing("media",{
        onUploadProgress:(p) => setProgress(p) 
    })
    const {user} = loginInfo()
    const [clicked,setClicked] = useState<boolean>(false)
    const [discard,setDiscard] = useState<boolean>(false)
    const [showEmoji,setShowEmoji] = useState<boolean>(false)
    const {w} = useSize()
    removeOverlay({
        tab:".story-area",
        setShow:setClicked
    })

    const handleColorClick = (color:string,type:string) => {
        setSelected(prev => ({...prev,[type]:color}));
    };
    const handleDiscard = () => {
        setTextStory("")
        setStory(undefined)
    }

    const handleClickEmoji =(emoji:EmojiClickData) => {
        setTextStory(prev => prev + emoji.emoji)
        setShowEmoji(false)
    }

    const handleSave = async () => {
        if(!user || progress>0) return
        let image = null;
        if(photoStory.media) {
            const file = photoStory.file;
            const files = Array.isArray(file) ? file : [file];
            const res = await startUpload(files)
            if(res&&res[0].url) {
                image = res[0].url
            }
        } else {
            setProgress(80)
        }
        const res = await new Story(user.id).addStory({
            textColor:selected.textColor,
            text:textStory ? textStory : null,
            media:image,
            bgColor:selected.bgColor ? selected.bgColor : null,
            visibility:choice,
            mediaClass:`${photoStory.class.scale}|${photoStory.class.rotate}`,
            type:story
        })
        if(res?.success) {
            setProgress(100)
            router.push("/stories");
        } else {
            setProgress(0)
        }
    }

    return (
        <>
            {w>767&&<div className="flex flex-col gap-3 p-2 relative flex-1">
                <div className="flex-1 flex gap-2 flex-col">
                    <div className="relative group story-area">
                        <AnimatePresence>
                            <motion.textarea
                                key={"text-area"}
                                initial={{ paddingTop: "20px" }}
                                animate={{ paddingTop: clicked || textStory ? "35px" : "20px" }}
                                exit={{ paddingTop: "20px" }}
                                name="story-text"
                                id="story-text"
                                className="rounded-md border-black/30 resize-none focus-within:outline-blue-400 focus-within:outline-3 border focus-within:outline-offset-[4px] h-[200px] border-spacing-4 p-5 py-5 placeholder:text-black/70 hover:border-black relative w-full group-focus-within:py-6"
                                value={textStory}
                                onFocus={() => setClicked(true)} // Change state on focus
                                onChange={(e) => setTextStory(e.target.value)}
                                placeholder="Start typing"
                            />
                            {(textStory||clicked)&&<motion.label
                            key="text-label"
                            initial={{opacity:0}}
                            animate={{opacity:1}}
                            exit={{opacity:0}} 
                            transition={{duration:0.3,ease:"easeInOut"}}
                            htmlFor="story-text" className="absolute top-5 left-5 text-blue-500  text-xs">
                                Text
                            </motion.label>}
                        </AnimatePresence>
                        <div className="absolute bottom-3 right-5 z-40">
                            <div className="relative flex justify-center items-center">
                                <div className="text-2xl cursor-pointer active:scale-95 hover-opacity">
                                    <HiOutlineFaceSmile 
                                    onClick={() => setShowEmoji(prev => !prev)}/>

                                </div>
                                {showEmoji&&<div className="absolute bottom-6">
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
                    <div className="rounded-md border-black/30 border p-3">
                        <h6 className="text-sm text-black/70">Text colors</h6>
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
                    </div>
                    {story=="text"&&
                    <div className="rounded-md border-black/30 border p-3">
                        <h6 className="text-sm text-black/70">Backgrounds</h6>
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

                </div>
                <div className=" flex items-center gap-2 border-t  pt-2 justify-center">
                        <button className="p-2 bg-gray-300/70 rounded-md px-10 font-semibold active:scale-95 hover:bg-gray-300 transition-all duration-300" onClick={() => setDiscard(true)}>Discard</button>
                        <button 
                        className={`p-2 bg-blue-400 rounded-md px-10 font-semibold active:scale-95  transition-all duration-300 text-white ${progress === 0 ? "bg-blue-400":"bg-blue-100"} relative`}
                        onClick={handleSave}>
                            {progress>0&&<div 
                            className="absolute top-0 bottom-0 right-0 left-0 bg-blue-500 rounded-md"
                            style={{width:`${progress}%`}}
                            />}
                            <span className="relative z-10 cursor-pointer">Share story</span>
                        </button>
                </div>
                {discard&&
                <OverlayTemplate title="Discard story?" setShow={setDiscard}>
                    <div className="h-full py-1">
                        <div className="p-3 flex-1">
                            <p className="text-sm sm:text-[0.9rem] text-black/80">Are you sure you want to discard this story? Your story won't be saved.</p>
                        </div>
                        <div className="flex justify-end items-center gap-3 mt-10 px-4">
                            <p className="text-sm sm:text-base font-medium text-blue-500 cursor-pointer" onClick={() => setDiscard(false)}>Continue editing</p>
                            <button className="p-[0.4rem] bg-blue-500 rounded-md px-10 font-semibold active:scale-95  transition-all duration-300 text-white" onClick={handleDiscard}>Discard</button>
                        </div>
                    </div>
                </OverlayTemplate>}
            </div>}

            {w<=767&&
            <SideSm
            selected={selected}
            setSelected={setSelected}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            handleClickEmoji={handleClickEmoji}
            textStory={textStory}
            setTextStory={setTextStory} 
            handleColorClick={handleColorClick}
            story={story}
            setShow={setShow}
            handleSave={handleSave}
            /> }           
        </>
        
    )
}