import { RiArrowDropUpLine } from "react-icons/ri";
import { smTabs } from "./tabsNames";
import { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { removeOverlay } from "@/lib/utils/hooks";

export default function TabsSm({handleChangeRoute,sk}:{
    handleChangeRoute:(arg:string|null) => void;
    sk:string|null
}) {
    const [show,setShow] = useState<boolean>(false)
    removeOverlay({
        tab:".more-tab",
        setShow
    })
    return (
        <div className="flex items-center gap-3 py-1 relative">
            <div  className={` cursor-pointer 
                ${!sk ?
                "border-b-blue-400 border-b-[3px] text-blue-400" :""}
                    py-1 `} onClick={() => handleChangeRoute(null)}>
                <div className="rounded-lg p-3 hover:bg-gray-300/40 active:bg-gray-300/60 transition-all duration-300">
                    Posts
                </div>              
            </div>
            <div className="flex flex-col items-center justify-center more-tab">
                <div className="rounded-lg p-3 hover:bg-gray-300/40 active:bg-gray-300/60 transition-all duration-300 flex items-center gap-1 cursor-pointer" onClick={() => setShow(prev=>!prev)}>
                    More 
                    <RiArrowDropUpLine className="text-2xl rotate-180"/>
                </div>
                <AnimatePresence>
                    {show&&
                    <motion.div
                    initial={{opacity:0,scale:0.8}}
                    animate={{opacity:1,scale:1}}
                    exit={{opacity:0,scale:0.8}}
                    transition={{duration:0.2,ease:"easeIn"}}
                    
                    className="absolute -bottom-24">
                        <div className="flex flex-col gap-1 bg-white shadow-[0px_0px_3px_1px_rgba(232,229,229,1)] rounded-lg p-2">
                            {smTabs.map((tab,index) => {
                                return (
                                    <div key={index}
                                    onClick={() => handleChangeRoute(tab.tab)} 
                                    className={`w-[120px] p-2 rounded-lg hover:bg-gray-300/50 transition-all duration-300 active:bg-gray-300/60 ${sk===tab.tab?"text-blue-400":""}`}>
                                        {tab.name}
                                    </div>
                                )
                            })}

                        </div>
                    </motion.div>}
                </AnimatePresence>
            </div>   
            
        </div>
    )
}