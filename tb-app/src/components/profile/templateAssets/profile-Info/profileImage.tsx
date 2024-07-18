import {  useState } from "react";
import { FaCamera } from "react-icons/fa";
import { TfiUpload } from "react-icons/tfi";
import { removeOverlay } from "@/lib/utils/hooks";


export default function ProfileImage({profileImage,profileName}:{
    profileImage:string|null;
    profileName:string
}) {
    const [show,setShow] = useState<boolean>(false)
    removeOverlay({
        tab:".image-tab",
        setShow:setShow
    })
    return (
        <>
            <div className="relative w-[168px] h-[140px]">
                <div className="absolute left-0 top-0 bottom-0 z-30 rounded-full bg-white -translate-y-10 p-1 image-tab w-[168px] h-[168px]">
                    <div className="w-full h-full relative cursor-pointer group hover:bg-black active:scale-90 transition-all duration-300 rounded-full max-lg:flex max-lg:justify-center max-lg:flex-col max-lg:items-center" onClick={() => setShow(prev=>!prev)}>
                        <img 
                        src={profileImage?profileImage:"/profile.jpg"} 
                        alt={`${profileName} profile image`}
                        className="rounded-full w-full h-full object-cover group-hover:hover-opacity " />
                        <div className="absolute bottom-2 right-2 rounded-full bg-gray-300/90  p-2 text-lg   group-hover:hover-opacity">
                                <FaCamera />
                        </div>
                        {show&&<div className="absolute -bottom-[3.8rem] bg-white rounded-lg p-2 font-semibold w-[250px] shadow-[0px_0px_3px_1px_rgba(1,2,3,0.4)] ">
                                <div className="flex items-center gap-2 p-2 transition-all duration-300 rounded-md hover:bg-gray-300/30 active:bg-gray-300/60 cursor-pointer">
                                    <TfiUpload className="text-xl" />
                                    <p className="cursor-pointer">Upload photo</p>
                                </div>
                        </div>}
                    </div>
                    
                </div>

            </div>
        </>
    )
}