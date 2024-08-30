import { UserType } from "@/lib/utils/types/user";
import { UnblockedConvosType } from "@/lib/utils/types/user.misc/user.misc";
import { ChangeEvent, SetStateAction, useState } from "react";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { motion,AnimatePresence } from "framer-motion";
import UserMisc from "@/lib/classes/User.misc/UserMisc";


export default function BlockedSearch({setBlocked,user,loading,setLoading,blocked}:{
    setBlocked:React.Dispatch<SetStateAction<UnblockedConvosType[]>>;
    user:UserType;
    loading:boolean;
    setLoading:React.Dispatch<SetStateAction<boolean>>;
    blocked:number
}) {
    const [input,setInput] = useState<string>("")
    const [show,setShow] = useState<boolean>(false)
    const handleSearch = async(e:ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const value = e.target.value
        setInput(value)
        const res = await new UserMisc(user.username).getBlockedconvoUsers(value??null)
        if(res?.success) {
            setBlocked(res.data)
            setLoading(false)
        }
    }
    return (
        <div className="flex gap-2 flex-col">
            <div className={`p-1 relative rounded-full  w-[52px] h-[28px] flex justify-center items-center border border-black/5 cursor-pointer self-end ${show?"bg-[rgb(24,118,242)]":"bg-[rgb(206,208,212)]"}`} onClick={() => setShow(prev => !prev)}>
                <AnimatePresence>
                    {!show ? (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: -10 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white p-1 rounded-full absolute border"
                        >
                            <IoSearchOutline />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 10 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white p-1 rounded-full absolute border"
                        >
                            <IoSearchOutline />
                        </motion.div>
                    )}
                </AnimatePresence>
                
            </div>
            {show&&<div className="relative flex justify-center items-center">
                <input type="text" name="blocked_search" className="rounded-full h-[35px] bg-gray-1 focus-within:outline-none border-0 placeholder:text-sm px-8" value={input} onChange={handleSearch} placeholder="Type a name" />
                <div className="absolute left-2 text-lg text-black/70">
                    <IoSearch />
                </div>
            </div>}
            {!loading&&input.length>0&&blocked===0&&<p className="text-sm text-center text-black/30">No matches for "{input}"</p>}
            {!loading&&input.length==0&&blocked===0&&<p className="text-center text-black/30">No blocked user</p>}
        </div>
    )
}