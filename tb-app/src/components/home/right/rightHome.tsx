import { UserType, userFriendsType } from "@/lib/utils/types/user"

import TopOfRight from "./topOfRight";
import { motion } from "framer-motion";
import { ScrollDetector } from "@/lib/utils/hooks";
import { useEffect, useState } from "react";
import Friend from "@/lib/classes/Friend";
import ContactFrame from "./contactFrame";

export default function  RightHome({user}:{
    user:UserType
}) {
    const [friends,setFriends] = useState<userFriendsType[]>([])
    useEffect(() => {
        if(!user) return
        const getFriends = async() => {
            const res = await Friend.getAllFriends(user.id)
            if(res?.success) {
                setFriends(res.data as any)
            }
        }
        getFriends()
    },[user])
    const startedScroll = ScrollDetector()

    return (
        <motion.div
        initial={{paddingTop:"0px"}}
        animate={{paddingTop:startedScroll?"80px":"0px"}}
        transition={{duration:0.2,ease:"easeInOut"}}
        className={`md:w-[280px] 2xl:w-[350px] h-screen   pb-8 hidden md:block sticky top-0 bottom-0`}>
            <div className="h-full overflow-y-scroll custom-scrollbar">
                <TopOfRight />
                <div className="flex flex-col">
                    {friends.length>0&&friends.map((info,index) => {
                        return (
                            <ContactFrame 
                            key={info.id+index+info.id} 
                            userInfo={info} 
                            userId={user.id}/>
                        )
                    })}
                </div>

            </div>
        </motion.div>
    )
}