
import { UserType } from "@/lib/utils/types/user";
import { TiWorld } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import { IoLockClosed } from "react-icons/io5";
import ReactDOM from "react-dom";
import { RxCross2 } from "react-icons/rx";
import UserPivacy from "@/lib/classes/User.misc/UserPrivacy";
import { radiosAndIcons } from "@/shared/others/otherLists";

type ViewType = "public"|"friends"|"me"
export default function PostsView({user,viewSettings}:{
    user:UserType;
    viewSettings:ViewType
}) {
    const [view,setView] = useState<ViewType>(viewSettings)
    const [show,setShow] = useState<boolean>(false)
    const [chosen,setChosen] = useState<ViewType>(view)
   

    const handleClick = async() => {
        if(!user) return
        const res = await new UserPivacy(user.id).updatePostsPrivacy(chosen)
        if(res?.success) {
            setView(chosen)
            setShow(false)
        }
    }
    return (
        <div className="flex justify-between items-center">
            <p className="text-sm text-black/70 break-words">Your default audience is set to <span className=" capitalize">{view}</span>. {view!=="me"&&"This will be your audience for future posts, but you can always change it for a specific post."}</p>
            <div className="text-base bg-gray-300/60 p-1 px-3 rounded-md font-semibold flex items-center gap-1 cursor-pointer hover:bg-gray-300/80 active:scale-95 active:outline-blue-500 active:outline" onClick={() => setShow(true)}>
                <div className="text-xl text-black/60">
                    {view==="public"&&<TiWorld/>}
                    {view==="me"&&<IoLockClosed/>}
                    {view==="friends"&&<FaUserFriends/>}
                </div>
                <span className=" truncate max-w-[100px]">
                    {view==="public"&&"Public"}
                    {view==="me"&&"Only me"}
                    {view==="friends"&&"Friends"}
                </span>
            </div>

            {show&&ReactDOM.createPortal(
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/70 flex justify-center items-center" onClick={() => setShow(false)}>
                <div className="rounded-lg bg-white shadow-2xl md:w-[500px] sm:w-[300px] " onClick={(e) => e.stopPropagation()}>
                    <div className="p-3 py-4 rounded-t-lg border-b flex justify-center items-center relative">
                        <h3 className="font-bold text-lg">Select audience</h3>
                        <div className="absolute right-3 text-2xl bg-gray-300/40 rounded-full p-2 active:scale-95 cursor-pointer hover:bg-gray-300 transition-all duration-300" onClick={() => setShow(false)}>
                            <RxCross2 />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-3 px-4 max-h-[450px] overflow-y-auto">
                        <div className="">
                            <h4 className="font-semibold">Who can see your posts?</h4>
                            <p className="text-sm text-black/70 break-words">Your post may show up in News Feed, on your profile, in search results</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {radiosAndIcons.map((radio,index) => {
                                const {icon,name,desc,value} =radio
                                return (
                                    <div key={index} className="p-2 flex items-center hover:bg-gray-300/40 rounded-md transition-all duration-300 cursor-pointer gap-1 justify-between" onClick={() => setChosen(value as ViewType)} role="radio">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl bg-gray-300/70 p-4 rounded-full">
                                                {icon}
                                            </div>
                                            <div className="">
                                                <h4 className="font-semibold cursor-pointer w-full capitalize">{name}</h4>
                                                <p className="text-sm text-black/70 break-words cursor-pointer">{desc}</p>
                                            </div>  

                                        </div>
                                        <div className={`rounded-full p-1   ${chosen===value?"border-blue-500 border-2":"border-black/70 border"}`}>
                                            {chosen===value?
                                            <div className="bg-blue-500 p-[0.35rem] rounded-full" />
                                            :
                                            <div className="p-[0.35rem] bg-white"/>}

                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>   
                    </div>
                    <div className="p-3 py-4 border-t rounded-b-lg flex justify-end gap-6 items-center">
                        <div className="text-blue-500 font-medium p-[0.35rem]  rounded-lg hover:bg-black/10 transition-all duration-300 cursor-pointer" onClick={() => setShow(false)}>
                            Cancel
                        </div>
                        <button className=" font-medium bg-blue-500 p-[0.35rem] rounded-lg text-white px-10 hover:bg-blue-700 transition-all duration-300 active:scale-95" onClick={handleClick}>Done</button>
                    </div>
                </div>
            </div>,document.body)}
        </div>
    )
}