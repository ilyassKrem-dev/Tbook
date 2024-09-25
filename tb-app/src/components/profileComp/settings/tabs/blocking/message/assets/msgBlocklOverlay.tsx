import { SetStateAction, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { RiUserForbidFill } from "react-icons/ri";
import AddBlock from "./addBlock";
import { AnimatePresence,motion } from "framer-motion";
import ShowBlocked from "./showBlocked";

export default function MsgBlockOverlay({setShow}:{
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    const [page,setPage] = useState<number>(0)
    const [showBlocked,setShowBlocked] = useState<boolean>(false)
    
    return (
        <>
            {ReactDOM.createPortal(
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-white/70" onClick={() => setShow(false)}>
                <div className="bg-white rounded-lg max-w-[500px] w-full shadow-lg h-fit block_messages" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-center items-center relative p-3 border-b">
                            <AnimatePresence>
                                {page>0&&
                                <motion.div
                                initial={{opacity:0,scale:0.8}}
                                animate={{opacity:1,scale:1}}
                                exit={{opacity:0,scale:0.8}}
                                transition={{duration:0.2,ease:"easeInOut"}}
                                className="absolute left-3 text-2xl bg-gray-300/60 transition-all duration-300 rounded-full p-1 cursor-pointer active:scale-95 text-black/70 hover:bg-gray-300" onClick={() => setPage(0)}>
                                    <FaArrowLeft />
                                </motion.div>}
                            </AnimatePresence>
                            <h1 className="font-bold text-xl">Block messages</h1>
                            <div className="absolute right-3 text-2xl bg-gray-300/60 transition-all duration-300 rounded-full p-1 cursor-pointer active:scale-95 text-black/70 hover:bg-gray-300" onClick={() => setShow(false)}>
                                <RxCross2 />
                            </div>
                        </div>
                        {!page&&
                        <div className="p-5">
                            <p className="text-sm text-black break-words font-normal">If you block someone&apos;s profile on Facebook, they won&apos;t be able to contact you in Messenger either. Unless you block someone&apos;s Facebook profile and any others they may create, they may be able to post on your timeline, tag you, and comment on your posts or comments.</p>
                            <div className="mt-3 flex flex-col gap-2">
                                <div className="flex gap-4 items-center hover:bg-gray-1 p-2 rounded-md cursor-pointer transition-all duration-300" onClick={() => setPage(1)}>
                                    <div className="text-xl text-white bg-blue-500 p-[0.625rem] rounded-full w-fit">
                                        <FaPlus />
                                    </div>
                                    <p className=" text-blue-500 font-bold cursor-pointer text-[1.1rem]">Add to blocked list</p>
                                </div>
                                {!showBlocked&&<div className="flex gap-4 items-center hover:bg-gray-1 p-2 rounded-md cursor-pointer transition-all duration-300" onClick={() => setShowBlocked(true)}>
                                    <div className="text-2xl text-black bg-gray-1 p-2 rounded-full w-fit">
                                        <RiUserForbidFill />
                                    </div>
                                    <p className=" text-black font-bold cursor-pointer text-[1.1rem]">See your blocked list</p>
                                </div>}
                                {showBlocked&&<ShowBlocked />}
                            </div>
                        </div>}
                        {page===1&&
                        <div className="p-5">
                            <AddBlock />
                        </div>}
                    </div>
                </div>  
            </div>,document.body)}
        </>
    )
}