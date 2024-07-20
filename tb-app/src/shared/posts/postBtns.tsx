import { BiLike,BiSolidLike  } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import { motion,AnimatePresence } from "framer-motion";
import { useState } from "react";
import Posts from "@/lib/classes/Posts";
import { useToast } from "@/assets/Wrappers/toastWrapper";
export default function PostBtns({userId,isLiked,postId}:{
    userId:string;
    isLiked:boolean;
    postId:string
}) {
    const [liked,setLiked] = useState<boolean>(isLiked)
    const {toast} = useToast()
    const handleLike = async() => {
        const res =  await Posts.changeLike(userId,postId)
        if(res?.success) {
            return setLiked(prev=>!prev)
        }
        if(res?.success == null) {
            return toast({
                varient:"error",
                title:"Error",
                description:res?.error as string
            })
        }
        if(res.success == false) {
            return toast({
                    varient:"error",
                    title:"Error",
                    description:res.error as string
                })
        }
        
    }
    return (
        <>
            <div className="flex gap-1 border-y border-gray-500/30 py-1 mt-10 px-4">
                <div className="flex-1 text-center font-bold text-gray-600/80 flex items-center gap-1 justify-center cursor-pointer hover:bg-gray-300/40 rounded-md hover-opacity active:scale-95 p-[0.4rem]" onClick={handleLike}>
                    <AnimatePresence>
                        {!liked?
                        <motion.div
                        initial={{scale:!liked?1:1.3,opacity:!liked?1:0.8}}
                        animate={{opacity:1,scale:1}}
                        exit={{scale:!liked?1:1.3,opacity:!liked?1:0.8}}
                        >
                            <BiLike className="text-xl"/>
                        </motion.div>
                        :
                        <motion.div
                        initial={{scale:liked?1:1.3,opacity:liked?1:0.8}}
                        animate={{opacity:1,scale:1}}
                        exit={{scale:liked?1:1.3,opacity:liked?1:0.8}}>
                            <BiSolidLike className="text-xl"/>
                        </motion.div>}
                    </AnimatePresence>
                    Like
                </div>
                <div className="flex-1 text-center font-bold text-gray-600/80 flex items-center gap-1 justify-center cursor-pointer hover:bg-gray-300/40 rounded-md hover-opacity active:scale-95 p-[0.4rem]">
                    <FaRegComment className="text-xl" />
                    Comment
                </div>
                <div className="flex-1 text-center font-bold text-gray-600/80 flex items-center gap-1 justify-center cursor-pointer hover:bg-gray-300/40 rounded-md hover-opacity active:scale-95 p-[0.4rem]">
                    <TbShare3  className="text-xl"/>
                    Share
                </div>
            </div>
        </>
    )
}