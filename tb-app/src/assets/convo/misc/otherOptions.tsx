import axios from "axios";
import { motion,AnimatePresence } from "framer-motion"
import { SetStateAction, useState } from "react";
import { MdBlock } from "react-icons/md";
import Servers from "@/lib/classes/Servers";
import { useToast } from "@/assets/Wrappers/toastWrapper";
const socketUrl = Servers.socketUrl
export default function OtherOptions({show,setShow,status,convoId,userId,statusBy}:{
    show:boolean;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    status:boolean;
    statusBy:string|null;
    convoId:string;
    userId:string
}) {

    const [convoStatus,setConvoStatus] = useState<boolean>(status)
    const {toast} = useToast()
    const handleBlock = async() => {
        try {
            const res = await axios.patch(`${socketUrl}/messages/status`,{
                convoId,
                status:convoStatus && statusBy === userId ? "unblock":"block",
                user_id:userId
            })
            if(res.data) {
                setShow(false)
                return setConvoStatus(prev => !prev)
            }
        } catch (error) {
            toast(
                {
                    varient:"error",
                    title:"Error",
                    description:"Error,try again later"
                }
            )
        }
    }

    return (
        <AnimatePresence>
            {show&&
            <motion.div
            initial={{opacity:0,scale:0.8}}
            animate={{opacity:1,scale:1}}
            exit={{opacity:0,scale:0.8}}
            transition={{duration:0.2,ease:"linear"}}
            className="absolute top-12 left-8 z-40">
                <div className="bg-white shadow-lg border rounded-md p-1 w-[150px] flex flex-col">
                    <div className=" cursor-pointer" onClick={handleBlock}>
                        <div className="flex gap-1 items-center p-1 hover:bg-gray-300/40 rounded-md transition-all duration-300 active:scale-95 font-semibold">
                            <div className="text-lg">
                                <MdBlock />
                            </div>
                            <p className=" cursor-pointer">
                                {
                                convoStatus && statusBy === userId
                                ?
                               "Unblock"
                                :
                                "Block"}
                            </p>
                        </div>
                    </div>
                    
                </div>
            </motion.div>}
        </AnimatePresence>
    )
}