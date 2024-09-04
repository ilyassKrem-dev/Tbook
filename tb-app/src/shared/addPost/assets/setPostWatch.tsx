import { MdArrowDropDown } from "react-icons/md";
import { radiosAndIcons } from "@/shared/others/otherLists";
import { TiWorld } from "react-icons/ti";
import { SetStateAction, useEffect, useState } from "react";
import { ViewPrivacyType } from "@/lib/utils/types/user.misc/user.privacy";
import { IoLockClosed } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
export default function SetPostWatch({profileImage,profileName,status,setStatus}:{
    profileImage:string|null;
    profileName:string;
    status:ViewPrivacyType;
    setStatus:React.Dispatch<SetStateAction<ViewPrivacyType|null>>
}) {
    const [show,setShow] = useState<boolean>(false)
    const handleClick = (value:any) => {
        setStatus(value)
        setShow(false)
    }
    useEffect(() => {
        const checkOverlay = (e:any) => {
            const overlay = document.querySelector(".post_status")
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("click",checkOverlay)

        return () => document.removeEventListener("click",checkOverlay)
    } ,[show])
    return (
        <>
            <div className="flex gap-3 p-2 px-4 items-center">
                <div className="w-[40px] h-[40px] rounded-full">
                    <img 
                    src={profileImage ? profileImage : "/profile.jpg"} 
                    alt={`${profileName} image`}
                    className="rounded-full w-full h-full object-cover border bg-white" />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold capitalize">{profileName}</h2>
                    <div className="relative post_status">
                        <button className="flex gap-1 items-center text-xs  p-[0.15rem] rounded-md  px-2 bg-gray-300/60 font-semibold relative" onClick={() => setShow(prev => !prev)}>
                            {status==="public"&&<TiWorld/>}
                            {status==="me"&&<IoLockClosed/>}
                            {status==="friends"&&<FaUserFriends/>}
                            <p className="max-w-[150px] truncate cursor-pointer capitalize">{status}</p>
                            <MdArrowDropDown className="text-xl"/>
                            
                        </button>
                        {show&&<div className="absolute top-8 z-30 ">
                                <div className="bg-white flex flex-col rounded-lg w-[150px] border">
                                    {radiosAndIcons.map((radio,index) => {
                                        const {icon,name,value} = radio
                                        return (
                                            <div onClick={() => handleClick(value)} key={index} className={`flex gap-2 items-center p-2 hover:bg-gray-300/30 transition-all duration-300 cursor-pointer ${status===value ? "bg-gray-300/30":""}`}>
                                                <div className="text-xl">
                                                    {icon}
                                                </div>
                                                <span className="font-semibold capitalize cursor-pointer">{name}</span>
                                            </div>
                                        )
                                    })}
                                    
                                </div>
                        </div>}
                    </div>
                </div> 
            </div>
        </>
    )
}