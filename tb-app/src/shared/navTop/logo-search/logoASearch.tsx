
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import {   useRef, useState } from "react";
import { motion,AnimatePresence} from "framer-motion";
import { removeOverlay } from "@/lib/utils/hooks";

export default function LogoASearch({w}:{w:number}) {
    const [show,setShow] = useState<boolean>(false)
    const [focused,setFocused] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const handleShow = () => {
        setShow(true)
        handleFocus()

        
    }
    const handleFocus = () => {
        if (inputRef.current) {
            setFocused(true)
            inputRef.current.focus();
        }
    };
    removeOverlay({
        tab:".search-tab",
        setShow:setShow
    })
    
    
    return (
        <div className={`py-2 flex gap-2 items-center  left-0 pl-3 ${w>953 ?"absolute ":""} search-tab`}>
            <Link href={"/"} className="bg-blue-600 text-white  rounded-full text-2xl font-bold p-1 px-3">
                T
            </Link>
            {w>953?
            <div className="relative flex justify-center items-center">
                <div onClick={handleShow}  className={`rounded-full p-2 focus-within:outline-none bg-gray-1/80 text-base placeholder:text-base pl-8 w-[250px] text-black/50 cursor-text`} >
                    Search
                </div>
                <IoSearch className="absolute left-2 text-xl text-black/30"/>
            </div>
            :
            <div className="bg-white-1/60 p-3 rounded-full cursor-pointer" onClick={handleShow}>
                <IoSearch className="text-base text-black/80"/>
            </div>
            }
            <AnimatePresence>
            {show && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute bg-white flex flex-col items-center gap-5 z-30 rounded-lg left-0 top-0 p-2 px-3 shadow-[-1px_4px_3px_1px_rgba(232,229,229,1)] "
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="rounded-full hover:bg-gray-300/50 p-2 cursor-pointer"
                                onClick={() => setShow(false)}
                            >
                                <FaArrowLeft className="text-black/60 text-lg" />
                            </div>

                            <div className="relative flex justify-center items-center">
                                <motion.input
                                    initial={{paddingLeft:focused?"16px":"32px"}}
                                    animate={{paddingLeft:focused?"16px":"32px"}}
                                    transition={{duration:0.2,ease:"linear"}}
                                    ref={inputRef}
                                    name="search"
                                    id="search"
                                    type="text"
                                    className={`rounded-full p-1 focus-within:outline-none bg-gray-1/80 text-base placeholder:text-base  w-[250px] max-[320px]:w-[200px]`}
                                    placeholder="Search"
                                    onFocus={handleFocus}
                                    onBlur={() => setFocused(false)}
                                />
                                <motion.div
                                initial={{opacity:focused?0:1}}
                                animate={{opacity:focused?0:1}}
                                transition={{duration:0.2,ease:"linear"}}  
                                className="absolute left-2">
                                    <IoSearch className="text-xl text-black/30"/>

                                </motion.div>
                            </div>
                        </div>
                        <p className="text-black/60">No recent searches</p>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )   
}