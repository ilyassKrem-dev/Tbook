import { FullUserType, UserType } from "@/lib/utils/types/user"
import { getStringDate } from "@/lib/utils/simpleUtils"
import { MdCake } from "react-icons/md";
import { BiLike,BiSolidLike  } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BsDot } from "react-icons/bs";



export default function RightSide({userInfo,user}:{
    userInfo:FullUserType;
    user:UserType | null
}) {
    const {day,month,year} = getStringDate(userInfo.birthdate)

    return (
        <div className="flex gap-3 w-full flex-col">
            <div className="px-4 py-3 rounded-lg bg-white text-lg font-bold sm-shadow">
                <h1>Posts</h1>
            </div>
            <div className="px-4 py-3 rounded-lg bg-white  sm-shadow">
                <div className="flex gap-3  items-center">
                    <div className="w-[40px] h-[40px] rounded-full">
                        <img 
                        src={userInfo.image ? userInfo.image: "/profile.jpg"} 
                        alt={`${userInfo.name} image`}
                        className="rounded-full w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-semibold capitalize text-base">{userInfo.name}</h2>
                        <div className="text-xs text-gray-500/70 flex items-center">
                            {month} {day}, {year} <BsDot />
                            <MdOutlineAccessTimeFilled className="text-base"/> 
                        </div>
                    </div> 
                </div>
                <div className="flex gap-4  items-center flex-col">
                    <div className="bg-blue-500 p-2 rounded-full">
                        <MdCake className="text-white text-3xl"/>
                    </div>
                    <p className="font-semibold text-lg">Born on {month} {day}, {year}</p>
                </div>
                <div className="flex gap-1 border-y border-gray-500/30 py-1 mt-10">
                    <div className="flex-1 text-center font-bold text-gray-600/80 flex items-center gap-1 justify-center cursor-pointer hover:bg-gray-300/40 rounded-md hover-opacity active:scale-95 p-[0.4rem]">
                        <BiLike className="text-xl"/>
                        Like
                    </div>
                    <div className="flex-1 text-center font-bold text-gray-600/80 flex items-center gap-1 justify-center cursor-pointer hover:bg-gray-300/40 rounded-md hover-opacity active:scale-95 p-[0.4rem]">
                        <FaRegComment className="text-xl" />
                        Comment
                    </div>
                    <div className="flex-1 text-center font-bold text-gray-600/80 flex items-center gap-1 justify-center cursor-pointer hover:bg-gray-300/40 rounded-md hover-opacity active:scale-95 p-[0.4rem]">
                        <TbShare3  className="text-xl"/>
                        Share
                    </div>
                </div>
                {user&&
                <div className="mt-4">
                        <div className={`flex gap-1 items-center`}>
                            <div className="w-[32px] h-[32px] rounded-full">
                                <img 
                                src={user?.image ? user?.image: "/profile.jpg"} 
                                alt={`${user?.name} image`}
                                className="rounded-full w-full h-full object-cover" />
                            </div>
                            <div className="w-full">
                                <div className="w-full">
                                <div 
                                    className={`w-full focus-within:outline-none resize-none  custom-scrollbar  font-noto bg-gray-500/10 rounded-full  p-[0.39rem] relative`}
                                    >
                                        <p contentEditable className=" focus-within:outline-none pl-1 break-words">

                                        </p>
                                        <p  className="absolute left-3 text-base text-gray-500/60 top-[0.50rem]">
                                            Write a comment...
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                </div>}
            </div>
        </div>
    )
}