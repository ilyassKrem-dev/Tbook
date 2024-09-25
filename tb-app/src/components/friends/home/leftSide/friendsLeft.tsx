import { IoMdSettings } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import LeftTemplate from "@/components/friends/shared/leftTemplate";
import { useRemoveOverlay, useSize } from "@/lib/utils/hooks";
import { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import BurgerCross from "../../shared/burgerCross";
const leftList = [
    {
        name:"home",
        link:"/friends/",
        home:true,
        icon:<IoPeopleSharp />
    },
    {
        name:"friends requests",
        link:"/friends/requests",
        home:false,
        icon:<IoMdPersonAdd />
    },
    {
        name:"suggestion",
        link:"/friends/suggestion",
        home:false,
        icon:<IoMdPersonAdd />
    },
    {
        name:"all friends",
        link:"/friends/all",
        home:false,
        icon:<FaUserFriends />
    }
]
export default function FriendsLeftSide() {
    const {w} = useSize()
    const [show,setShow] = useState<boolean>(false)
    useRemoveOverlay({
        tab:".friends-nav",
        setShow
    })
    return (
        <LeftTemplate>
            {w>767&&
            <div className="p-3 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Friends</h1>
                    <div className="text-2xl p-2 rounded-full bg-gray-300/50 cursor-pointer hover:bg-gray-300 transition-all duration-300 active:scale-95">
                        <IoMdSettings/>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    {leftList.map((info,index) => {
                        const {name,home,link,icon} = info
                        return (
                            <Link href={link} key={index} className={`flex items-center gap-4 p-2 rounded-md  cursor-pointer hover:bg-black/5 transition-all duration-300 justify-between ${home ?"bg-black/5" :""}`}>
                                <div className="flex gap-4 items-center">
                                    <div className={` text-2xl rounded-full p-2 rotate-360 ${home?"bg-blue-600 text-white":"text-black bg-gray-300/60"}`}>
                                        {icon}
                                    </div>
                                    <span className=" capitalize font-semibold text-lg">{name}</span>
                                </div>
                                {!home&&
                                <div className="text-3xl text-black/70">
                                    <MdOutlineKeyboardArrowRight />
                                </div>}
                            </Link>
                        )
                        
                    })}
                   
                </div>

            </div>}
            {w<=767&&
            <div className="p-3 flex flex-col gap-5 friends-nav shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Friends</h1>
                    <div className="flex gap-4 items-center">
                        <div className="text-2xl p-2 rounded-full bg-gray-300/50 cursor-pointer hover:bg-gray-300 transition-all duration-300 active:scale-95">
                            <IoMdSettings/>
                        </div>
                        <BurgerCross setShow={setShow} show={show}/>

                    </div>
                </div>
                <AnimatePresence>
                    {show&&
                    <motion.div
                    initial={{opacity:0,scale:0.8}}
                    animate={{opacity:1,scale:1}}
                    exit={{opacity:0,scale:0.8}}
                    transition={{ease:"easeInOut"}}
                    className="flex flex-col gap-3">
                        {leftList.map((info,index) => {
                            const {name,home,link,icon} = info
                            return (
                                <Link href={link} key={index} className={`flex items-center gap-4 p-2 rounded-md  cursor-pointer hover:bg-black/5 transition-all duration-300 justify-between ${home ?"bg-black/5" :""}`}>
                                    <div className="flex gap-4 items-center">
                                        <div className={` text-2xl rounded-full p-2 rotate-360 ${home?"bg-blue-600 text-white":"text-black bg-gray-300/60"}`}>
                                            {icon}
                                        </div>
                                        <span className=" capitalize font-semibold text-lg">{name}</span>
                                    </div>
                                    {!home&&
                                    <div className="text-3xl text-black/70">
                                        <MdOutlineKeyboardArrowRight />
                                    </div>}
                                </Link>
                            )
                            
                        })}
                        
                    </motion.div>}
                </AnimatePresence>    
            </div>}
        </LeftTemplate>
    )
}