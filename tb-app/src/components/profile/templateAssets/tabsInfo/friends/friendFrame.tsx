import { removeOverlay } from "@/lib/utils/hooks";
import { userFriendsType } from "@/lib/utils/types/user"
import Link from "next/link"
import { SetStateAction, useRef, useState } from "react"
import { HiDotsHorizontal } from "react-icons/hi"
import { IoPersonRemoveOutline } from "react-icons/io5";
import { motion,AnimatePresence } from "framer-motion";
import Friend from "@/lib/classes/Friend";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";

export default function FriendFrame({view,friendProfile,setFriends}:{
    view?:boolean
    friendProfile:userFriendsType;
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>
}) {
    const {friend} = friendProfile
    const [show,setShow] = useState<boolean>(false)
    const devRef = useRef<HTMLDivElement>(null)
    const [overlayPosition,setOverlayPosition] = useState<"top"|'bottom'>('bottom')
    const {user} = loginInfo()
    const toggleOverlay = () => {
        if (devRef.current) {
            const rect = devRef.current.getBoundingClientRect();
            
            const shouldShowOnTop = rect.top < window.innerHeight / 1.5;
            setOverlayPosition(shouldShowOnTop ? 'bottom' : 'top');
            setShow(prev => !prev);
        }
    };
    removeOverlay({
        tab:".more_friend",
        setShow
    })
    const handleRemove = async() => {
        if(!user) return
        const res = await Friend.removeFriend(user.id,friend.id,"")
        if(res?.success) {
            setFriends(prev => (prev.filter(friend => friend.id !== friendProfile.id)))
        }
    }
    return (
        <div  className="flex items-center justify-between shadow-[0px_0px_1px_1px_rgba(232,229,229,1)] p-3 rounded-lg py-4">
            <div className="flex items-center gap-5">
                <Link href={`/profile/${friend.username}`} className="w-[80px] h-[80] rounded-lg hover:bg-black/30 group transition-all duration-300">
                    <img 
                    src={friend.image?? "/profile.jpg"} 
                    alt={friend.name +" image"}
                    className="w-full h-full rounded-lg group-hover:opacity-70 transition-all duration-300 border bg-white" />
                </Link>
                <div className="flex flex-col">
                    <Link href={`/profile/${friend.username}`} className="font-bold text-lg hover:underline transition-all duration-300">
                        {friend.name}
                    </Link>
                </div>
            </div>
            {!view&&
            <div className="relative more_friend" ref={devRef}>
                <div className="hover:bg-gray-300/30 p-2 text-lg rounded-full cursor-pointer active:scale-95" onClick={toggleOverlay}>
                    <HiDotsHorizontal />
                </div>
                <AnimatePresence>
                    {show&&
                    <motion.div
                    initial={{scale:0.8,opacity:0}}
                    animate={{scale:1,opacity:1}}
                    exit={{scale:0.8,opacity:0}} 
                    className={`absolute ${overlayPosition === 'top' ? 'bottom-10' : 'top-10'}    bg-white  rounded-lg shadow-lg right-0 md:left-3 md:right-auto`}>
                        <div className="flex flex-col gap-2 relative p-3">
                            <div className="flex gap-4 font-semibold w-[200px] cursor-pointer p-1 hover:bg-gray-300/30 rounded-md px-2 transition-all duration-300 items-center" onClick={handleRemove}>
                                <IoPersonRemoveOutline className="text-xl"/>
                                <span>Unfriend</span>
                            </div>
                        </div>
                    </motion.div>}

                </AnimatePresence>
            </div>}
        </div>
    )
}