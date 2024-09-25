

import { IoSearch } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { ChangeEvent, SetStateAction, useState } from "react";
import { userFriendsType } from "@/lib/utils/types/user";
import { RxCross2 } from "react-icons/rx";
import { motion,AnimatePresence } from "framer-motion";

export default function  TopOfRight({setFriends,friends}:{
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>;
    friends:userFriendsType[]
}) {
    const [show,setShow] = useState<boolean>(false)
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
        setFriends(friends.filter(friend=>friend.friend.name.toLowerCase().startsWith(value)))
    }
    return (
        <div className={`p-2 font-semibold capitalize flex flex-col gap-4 pr-3 `}>
            <div className="flex justify-between items-center text-gray-800 text-lg">
                {!show&&<p>Contacts</p>}
                <AnimatePresence>
                    {show&&<motion.div
                    initial={{opacity:0,scale:0.8}}
                    animate={{opacity:1,scale:1}}
                    exit={{opacity:0,scale:0}}
                    className="relative flex justify-center items-center">
                        <input type="text" className="rounded-full h-[30px] text-sm bg-black/5 focus-within:outline-none placeholder:text-sm px-8" placeholder="Name" onChange={handleSearch}/>
                        <div className="absolute left-2">
                            <IoSearch />
                        </div>
                        <div className="absolute right-2 transition-all duration-300 hover:bg-gray-300 p-1 rounded-full cursor-pointer" onClick={() => setShow(false)}>
                            <RxCross2 />
                        </div>
                    </motion.div>}
                </AnimatePresence>
                <div className="flex items-center gap-3 text-lg">
                    {!show&&<div className="p-2 hover:bg-gray-300/70 rounded-full active:bg-gray-300 transition-all duration-300 cursor-pointer relative flex flex-col items-center justify-center group" onClick={() => setShow(true)}>
                        <IoSearch />
                        <div className=" absolute -bottom-9 text-sm bg-dark/80 text-white p-1 rounded-lg font-medium hidden group-hover:block">
                            Search
                        </div>
                    </div>}
                    
                    
                </div>
            </div>
        
        </div>
    )
}