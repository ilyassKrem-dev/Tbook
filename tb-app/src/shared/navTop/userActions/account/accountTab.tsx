import { UserType } from "@/lib/utils/types/user"
import { useEffect, useState } from "react"
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { motion,AnimatePresence } from "framer-motion";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { signOut } from "next-auth/react";

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

    useEffect(() => {
        const removeToast = (e:any) => {
            const overlay = document.querySelector('.acc-tab')
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener('click',removeToast)
    
        return () => document.removeEventListener('click',removeToast)
  
    },[])

    return (
        <div className="relative acc-tab">
            <div className="w-[40px]  h-[40px] ">
                    <img 
                    src={image?image:"/profile.jpg" }
                    alt="/profile.jpg"
                    className="w-full h-full rounded-full object-cover active:scale-90 cursor-pointer"
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
                className="absolute -bottom-[10.5rem] right-0">
                    <div className="bg-white shadow-[0px_0px_3px_1px_rgba(232,229,229,1)] rounded-lg p-2">
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