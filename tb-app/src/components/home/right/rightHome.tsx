import { UserType } from "@/lib/utils/types/user"

import TopOfRight from "./topOfRight";
import { motion } from "framer-motion";
import { ScrollDetector } from "@/lib/utils/hooks";


export default function  RightHome({user}:{
    user:UserType
}) {
    const startedScroll = ScrollDetector()
    return (
        <motion.div
        initial={{paddingTop:"0px"}}
        animate={{paddingTop:startedScroll?"80px":"0px"}}
        transition={{duration:0.2,ease:"easeInOut"}}
        className={`md:w-[280px] 2xl:w-[350px] h-full overflow-y-auto custom-scrollbar pb-8 hidden md:block sticky top-0 bottom-0`}>
            <TopOfRight />
            <div>
                {/*Later after profile*/ }
            </div>
        </motion.div>
    )
}