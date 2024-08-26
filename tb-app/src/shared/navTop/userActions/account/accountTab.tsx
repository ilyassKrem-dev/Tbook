import { UserType } from "@/lib/utils/types/user"
import { useEffect, useState } from "react"
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { motion,AnimatePresence } from "framer-motion";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { signOut } from "next-auth/react";
import { removeOverlay } from "@/lib/utils/hooks";

const accTabs = [
    {
        icon:<IoMdSettings className="text-2xl"/>,
        name:"Settings",
        link:"/profile/settings"
    },
    {
        icon:<MdDarkMode className="text-2xl"/>,
        name:"Display",
        link:"/profile/settings"
    },
    {
        icon:<IoLogOut className="text-2xl"/>,
        name:"Logout",
        link:"#"
    }
]
export  default function AccountTab({user}:{
    user:UserType
}) {
    const [show,setShow] = useState<boolean>(false)
    const {image} = user
    const hadnleSignout = (value:string) => {
        if(value !== "Logout") return
        signOut()
    }
    removeOverlay({
        tab:".acc-tab",
        setShow:setShow
    })
    

    return (
        <div className="relative acc-tab">
            <div className="w-[40px]  h-[40px] ">
                    <img 
                    src={image?image:"/profile.jpg" }
                    alt="/profile.jpg"
                    className="w-full h-full rounded-full object-cover active:scale-90 cursor-pointer border bg-white"
                    onClick={() => setShow(prev => !prev)}
                    />
            </div>
            <AnimatePresence>
                {show&&
                <motion.div
                initial={{opacity:0,scale:0.8}}
                animate={{opacity:1,scale:1}}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{duration:0.2,ease:"easeInOut"}} 
                className="absolute top-[2.5rem] right-0">
                    <div className="bg-white shadow-[0px_0px_3px_1px_rgba(232,229,229,1)] rounded-lg p-2">
                        <div className="p-2  rounded-lg shadow-md flex items-center gap-2 border border-black/5 hover:bg-gray-300/30 py-3 cursor-pointer transition-all duration-300 bg-white">            
                            <div className="w-[36px] h-[36px]">
                                <img 
                                src={user.image??"/profile.jpg"} 
                                alt=""
                                className="w-full h-full bg-white rounded-full border object-cover" />
                            </div>
                            <p className="font-bold truncate max-w-[200px] capitalize trxt-lg cursor-pointer">{user.username}</p>
                        </div>
                        {accTabs.map((tab,index) => {
                            return (
                                <Link onClick={() => hadnleSignout(tab.name)} key={index} href={tab.link} className="flex items-center justify-between w-[200px] max-[360px]:w-[180px] md:w-[250px] cursor-pointer p-2 hover:bg-gray-300/80 rounded-md transition-all duration-300 active:bg-gray-300">
                                    <div className="flex gap-2 items-center">
                                        <div className="bg-gray-300 p-1 rounded-full">
                                            {tab.icon}
                                        </div>
                                        <p className=" cursor-pointer font-semibold text-base">{tab.name}</p>
                                    </div>
                                    {tab.name!=="Logout"&&<IoIosArrowForward className="text-2xl"/>}
                                </Link>
                            )
                        })}
                    </div>
                </motion.div>}

            </AnimatePresence>
        </div>
    )
}