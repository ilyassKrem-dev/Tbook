import {  useState } from "react";
import { FaCamera } from "react-icons/fa";

import { removeOverlay } from "@/lib/utils/hooks";
import UploadImage from "./uploadImage";

export default function ProfileImage({profileImage,profileName,isUser,userId}:{
    profileImage:string|null;
    profileName:string;
    isUser:boolean;
    userId:string|undefined
}) {
    const [profileImg,setProfileImg] = useState<string|null>(profileImage)
    const [show,setShow] = useState<boolean>(false)
    removeOverlay({
        tab:".image-tab",
        setShow:setShow
    })
    const handleShow = () => {
        if(!isUser) return
        setShow(prev=>!prev)
    }
    return (
        <>
            <div className="relative w-[168px] h-[140px] image-tab">
                <div className="absolute left-0 top-0 bottom-0 z-30 rounded-full bg-white -translate-y-10 p-1 image-tab w-[168px] h-[168px]">
                    <div className="w-full h-full relative cursor-pointer group hover:bg-black active:scale-90 transition-all duration-300 rounded-full max-lg:flex max-lg:justify-center max-lg:flex-col max-lg:items-center" onClick={handleShow}>
                        <img 
                        src={profileImg?profileImg:"/profile.jpg"} 
                        alt={`${profileName} profile image`}
                        className="rounded-full w-full h-full object-cover group-hover:hover-opacity border bg-white" />
                        <div className="absolute bottom-2 right-2 rounded-full bg-gray-300/90  p-2 text-lg   group-hover:hover-opacity">
                                <FaCamera />
                        </div>
                    </div>
                
                    
                </div>

                {show&&isUser&&<UploadImage userId={userId} setProfileImg={setProfileImg}/>}
            </div>
        </>
    )
}