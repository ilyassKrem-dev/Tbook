import { FullUserType } from "@/lib/utils/types/user"
import Link from "next/link"
import {  useState } from "react"
import { IoMdPhotos } from "react-icons/io";
import AddPost from "@/shared/addPost/addPost";

import { UserType } from "@/lib/utils/types/user"


export default function SendPost({user}:{
    user:UserType
}) {
    const [show,setShow] = useState<boolean>(false)
    return (
        <>
            <div className="flex-1 bg-white rounded-lg p-3  px-4 flex flex-col gap-3 w-full sm-shadow">
                <div className="flex gap-3 items-center">
                    <Link  href={`/profile/${user.username}`} className=" hover:opacity-50  w-[43.43px] h-[40px] ">
                        <img 
                        src={user.image?user.image:"/profile.jpg"}
                        alt={`${user.name} image`}
                        className="w-full h-full object-cover rounded-full border bg-white"
                            />

                    </Link>
                    <div className="w-full rounded-full  bg-gray-300/40 text-gray-500 p-[0.55rem] pl-4 cursor-pointer hover-opacity" onClick={() => setShow(true)}>
                        What's on your mind??
                    </div>
                </div>  
                <div className="bg-gray-300 h-px w-full" />
                <div className="flex gap-3 justify-center items-center">
                    <div className="flex gap-2 items-center font-semibold text-base text-gray-500/80 cursor-pointer hover:bg-gray-300/60 p-1 rounded-md px-8 transition-all duration-300" onClick={() => setShow(true)}>
                        <IoMdPhotos className=" text-green-1 text-3xl"/>
                        Photo/Video
                    </div>
                </div>
                {show&&<AddPost user={user} setShow={setShow}/>}
            </div>
        </>
    )
}