import { UserType } from "@/lib/utils/types/user"
import React, { SetStateAction } from "react";
import { IoMdSettings } from "react-icons/io"




export default function LeftSideStories({user,setShow,children}:{
    user:UserType;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    children?:React.ReactNode
}) {


    return (
        <div className="md:w-[350px] hidden md:block">
            <div className="bg-white md:w-[350px] fixed top-0 left-0 md:bottom-0 right-0 py-1 z-30 hidden md:flex pt-14  flex-col">
                <div className="border-y border-black/10 p-3 pb-6 flex flex-col gap-2">
                    <div className=" flex justify-between items-center">
                        <h1 className="font-bold text-2xl">Your story</h1>
                        <div className="rounded-full p-2 bg-gray-300/70 hover:bg-gray-300 cursor-pointer active:scale-95 transition-all duration-300 text-2xl" onClick={() => setShow(true)}>
                            <IoMdSettings />
                        </div>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <div className="w-[60px] h-[60px] rounded-full">
                            <img 
                            src={user.image ?? "/profile.jpg"} 
                            alt={user.name + " image"}
                            
                            className=" object-cover rounded-full w-full h-full bg-white border" />
                        </div>
                        <p className="font-bold text-lg">{user.name}</p>
                    </div>
                </div>
                {children}
            </div>
            
        </div>
    )
}