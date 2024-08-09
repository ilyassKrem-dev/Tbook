import { useEffect, useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { motion,AnimatePresence } from "framer-motion";
import { useToast } from "@/assets/Wrappers/toastWrapper";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import axios from "axios";
import Servers from "@/lib/classes/Servers";
export default function MsgReaction({message_id,userId,isUser}:{
    message_id:string;
    userId:string;
    isUser:boolean
}) {
    const [show,setShow] = useState<boolean>(false)
    const [timed,setTimed] = useState<boolean>(false)
    const [hovered,setHoverd] = useState<boolean>(false)
    const {toast} = useToast()
    const handleReaction = async (e:EmojiClickData) => {
        const emj = e.emoji
        const socketURl = Servers.socketUrl
        try {
            const res = await axios.post(`${socketURl}/messages/reaction`,{
                reaction:emj,
                message_id,
                user_id:userId
            })
            if(res.data) {
                return setShow(false)
            }
        } catch (error) {
            toast({
                varient:"error",
                title:"Error",
                description:"Error adding a raction"
            })
        }
    }
    useEffect(() => {
        if(timed) return
        const overlayRemove = (e:any) => {
            const overlay = document.querySelector(".reaction-tab")
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("click",overlayRemove)

        return () => document.removeEventListener("click",overlayRemove)
    },[timed])
    useEffect(() => {
        if(!timed) return
        const id = setTimeout(() => {
            setTimed(false)
        },100)
        return () => clearTimeout(id)
    },[timed])
    return(
        <div className="relative reaction-tab" 
        onMouseOver={() => setHoverd(true)}
        onMouseOut={() =>setHoverd(false)}>
            <div className="p-1 rounded-full hover:bg-gray-300/40 transition-all duration-300 active:scale-95 text-black/50 text-xl cursor-pointer relative flex items-center justify-center reaction-tab" 
            
            onClick={() => {
                setShow(prev =>!prev)
                setTimed(true)}}>
                <HiOutlineEmojiHappy />
                <AnimatePresence>
                    {hovered&&
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}} 
                    transition={{duration:0.3,ease:"linear"}}
                    className="absolute bg-black/40 transition-all duration-300 rounded-md p-1 text-xs roudned-md text-white top-7 ">
                        Reaction
                    </motion.div>}
                </AnimatePresence>
            </div>
            {show&&<div className={`absolute bottom-8  ${isUser?"-right-20":"-left-24"} z-30`}>
                <EmojiPicker reactionsDefaultOpen={true} lazyLoadEmojis onReactionClick={handleReaction} width="50%"/>
            </div>}
        </div>
    )
}