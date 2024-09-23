import { useState } from "react";

import OverlayTemplate from "@/components/profileComp/settings/assets/shared/overlayTemplate";
import SelectOptions from "@/components/profileComp/settings/assets/shared/selectOptions";
import { FaGlobeAfrica } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import SelectStory from "./asset/selectStory";
import LeftSideStories from "../shared/create/LeftSideStories";
import { colors } from "./misc/misc";
import TextSide from "./asset/shared/textSide";
import PreviewStory from "./asset/preview/previewStory";
const selections = [
    
    {
        name:"Public",
        value:"all",
        icon:<FaGlobeAfrica />,
        desc:"Anyone on Tbook "
    },
    {
        name:"Friends",
        value:"friends",
        icon:<FaUserFriends />,
        desc:"Only your friends"
    }
]
export default function CreateStory() {
    const [show,setShow] = useState<boolean>(false)
    const [choice,setChoice] = useState<"all"|"friends">("all")
    const [story,setStory] = useState<"text"|"photo"|undefined>()
    const [textStory,setTextStory] = useState<string>("")
    const [photoStory,setPhotoStory] = useState<{
        media:string;
        file:File[];
        class:{
            scale:number;
            rotate:number
        }
    }>(
        {
            media:"",
            file:[],
            class:{
                scale:50,
                rotate:0
            }
        }
    )
    const [selectedColor, setSelectedColor] = useState<{
        bgColor:string;
        textColor:"black"|"white";
    }>({
        bgColor:colors[0],
        textColor:"white"
    });

    const {user} = loginInfo()
  
    return (
        <>
            <div className="h-screen">
                {user&&
                <div className="flex h-full">
                    <LeftSideStories setShow={setShow} user={user}>
                        {story&&
                        <TextSide
                        textStory={textStory}
                        setTextStory={setTextStory} 
                        selected={selectedColor} 
                        setSelected={setSelectedColor}
                        setStory={setStory}
                        story={story}
                        photoStory={photoStory}
                        choice={choice}/>}
                        
                    </LeftSideStories>
                    {!story&&
                    <SelectStory 
                    setStory={setStory}
                    setPhotoStory={setPhotoStory}/>}
                    {story&&
                    <PreviewStory 
                    textStory={textStory} 
                    selectedColor={selectedColor}
                    story={story}
                    photoStory={photoStory}
                    setPhotoStory={setPhotoStory}
                    />}
                </div>}
            </div>

            {show&&
            <OverlayTemplate title="Story privacy" setShow={setShow}>
                        <div className="flex flex-col px-4 py-2">
                            <h1 className=" font-semibold text-[1.1rem]">Who can see your story?</h1>
                            <p className="text-sm text-black/50">Your story will be visible for 24 hours on Tbook.</p>
                        </div>
                        <div className="p-2 flex flex-col gap-1">
                            {selections.map((select,index) => {
                                const {name,value,desc,icon} = select
                                return (
                                    <SelectOptions 
                                    key={index}
                                    value={value}
                                    name={name}
                                    desc={desc}
                                    icon={icon}
                                    chosed={choice}
                                    setChosen={setChoice}
                                    />
                                )
                            })}
                        </div>
                        <div className="p-3 py-4 border-t rounded-b-lg flex justify-end gap-6 items-center">
                            <div className="text-blue-500 font-medium p-[0.35rem]  rounded-lg hover:bg-black/10 transition-all duration-300 cursor-pointer" onClick={() => setShow(false)}>
                                Cancel
                            </div>
                            <button className=" font-medium bg-blue-500 p-[0.35rem] rounded-lg text-white px-10 hover:bg-blue-700 transition-all duration-300 active:scale-95" onClick={() => setShow(false)}>Save</button>
                        </div>
            </OverlayTemplate>}
        </>
    )
}