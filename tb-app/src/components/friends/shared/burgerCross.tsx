import { motion,AnimatePresence } from "framer-motion"
import { SetStateAction } from "react";



export default function BurgerCross({show,setShow}:{
    show:boolean;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {

    return (
        <div className="text-2xl p-2 rounded-full bg-gray-300/50 cursor-pointer hover:bg-gray-300 transition-all duration-300 active:scale-95 w-[40px] h-[40px]">
            <AnimatePresence>
                {!show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1,gap:"7px" }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex flex-col gap-[0.15rem] items-center justify-center cursor-pointer"
                    onClick={() => setShow(prev => !prev)}
                >
                    <motion.div
                    initial={{ rotate: '45deg', y: '4.8px' }}
                    animate={{ rotate: '0deg' }}
                    exit={{ rotate: '45deg', y: '4.8px' }}
                    transition={{ duration: 0.3 }}
                    className="bg-black h-[0.25rem] w-[25px] rounded-full"
                    />
                    <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-black h-[0.25rem] w-[25px] rounded-full"
                    />
                    <motion.div
                    initial={{ rotate: '-45deg', y: '-4.8px' }}
                    animate={{ rotate: '0deg'}}
                    exit={{ rotate: '-45deg', y: '-4.8px' }}
                    transition={{ duration: 0.3 }}
                    className="bg-black h-[0.25rem] w-[25px] rounded-full"
                    />
                </motion.div>
                )}

                {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex flex-col gap-[0.15rem] items-center justify-center cursor-pointer"
                    onClick={() => setShow(prev => !prev)}
                >
                    <motion.div
                    initial={{ rotate: '0deg' }}
                    animate={{ rotate: '45deg', y: '10px' }}
                    exit={{ rotate: '0deg' }}
                    transition={{ duration: 0.3 }}
                    className="bg-black h-[0.2rem] w-[25px] rounded-full"
                    />
                    <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-black h-[0.2rem] w-[25px] rounded-full"
                    />
                    <motion.div
                    initial={{ rotate: '0deg' }}
                    animate={{ rotate: '-45deg', y: '-1px' }}
                    exit={{ rotate: '0deg' }}
                    transition={{ duration: 0.3 }}
                    className="bg-black h-[0.2rem] w-[25px] rounded-full"
                    />
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}