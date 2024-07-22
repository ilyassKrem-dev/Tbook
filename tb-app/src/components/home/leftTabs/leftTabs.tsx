import { UserType } from "@/lib/utils/types/user"

import { tabs } from "./tabs"
import Link from "next/link"
import { ScrollDetector } from "@/lib/utils/hooks"
import { motion } from "framer-motion"


export default function LeftTabs({user}:{
    user:UserType
}) {
    const startedScroll = ScrollDetector()
    const {image,name} = user
    return (
        <motion.div
        initial={{paddingTop:"0px"}}
        animate={{paddingTop:startedScroll?"80px":"0px"}}
        transition={{duration:0.2,ease:"easeInOut"}}
        className={`md:w-[280px] 2xl:w-[350px] h-full overflow-y-auto custom-scrollbar pb-8 hidden lg:block sticky top-0 bottom-0 `}>
            <div className="p-2 font-semibold capitalize flex flex-col gap-4">
                <Link href={"/profile"} className="flex gap-3 items-center hover:bg-white-1/80 active:bg-gray-300 cursor-pointer rounded-lg p-2 transition-all duration-300">
                    <div className="w-[30px] h-[30px]">
                        <img 
                        src={image?image:"/profile.jpg"} 
                        alt={`${name} image`}
                        className="rounded-full h-full w-full object-cover"/>
                    </div>
                    <p className=" cursor-pointer " >{name}</p>
                </Link>
                {tabs.map((tab,index) => {

                    return (
                        <Link key={index} href={tab.link} className="flex gap-3 items-center hover:bg-white-1/80 active:bg-gray-300 cursor-pointer rounded-lg p-2 transition-all duration-300">
                            <div className="text-3xl">
                               {tab.icon}
                            </div>
                            <p className=" cursor-pointer " >{tab.name}</p>
                        </Link>
                    )
                })}
            </div>
        </motion.div>
    )
}