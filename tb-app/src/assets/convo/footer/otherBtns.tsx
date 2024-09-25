import { FaCirclePlus, FaRegFileImage } from "react-icons/fa6";
import { MdMic } from "react-icons/md";
import { motion,AnimatePresence } from "framer-motion";
import { ChangeEvent, SetStateAction, useState } from "react";
import { nanoid } from "nanoid";
import { useRemoveOverlay } from "@/lib/utils/hooks";
type ContentType = {
    text:string;
    medias:{
        id:string;
        url:string;
        type:"audio"|"image"|"video";  
        file:File 
    }[];
}

export default function OtherBtns({text,medias,setContent}:{
    text:string;
    medias:any[];
    setContent:React.Dispatch<SetStateAction<ContentType>>
}) {
    const [show,setShow] = useState<boolean>(false)
    const handleAddMedia = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const files = e.target.files
        if(files&&files.length>0) {
            const arrFiles = Array.from(files)
            const handleFiles = (files:File[]) => {
                if(files.length===0) return
                const file = files.shift()
                const fileReader = new FileReader()
                fileReader.onload = (e) => {
                    if(file) {
                        if(file.type.includes("image")) {
                            const added = {
                                id:nanoid(),
                                type:"image",
                                url:fileReader.result,
                                file:file
                            }
                            setContent((prev:any) => {
                                return {...prev,medias:[...prev.medias,added]}
                            })
                                
                        }
                        if(file.type.includes("audio")) {
                            const added = {
                                id:nanoid(),
                                type:"audio",
                                url:fileReader.result,
                                file:file
                            }
                            setContent((prev:any) => {
                               return {...prev,medias:[...prev.medias,added]}
                            })
                        }
                        if(file.type.includes("video")) {
                            const added = {
                                id:nanoid(),
                                type:"video",
                                url:fileReader.result,
                                file:file
                            }
                            setContent((prev:any) => {
                               return {...prev,medias:[...prev.medias,added]}
                            })
                        }
                    }
                    handleFiles(files)
                }
                fileReader.readAsDataURL(file as File)
            }
            handleFiles(arrFiles)
        }
        setShow(false)
    }
    useRemoveOverlay({
        tab:".more_btns",
        setShow
    })
    return (
        <>
            
                {text.length==0
                ?
                <AnimatePresence>
                    <>
                        {/*Later */}                  
                        <motion.div
                        initial={{scale:0.8,opacity:0}}
                        animate={{scale:1,opacity:1}}
                        exit={{scale:0.8,opacity:0}}  
                        className="p-2 hover:bg-gray-300/30 rounded-full cursor-pointer transition-all duration-300 active:scale-95 text-xl">
                            <MdMic />
                        </motion.div>
                        <>
                            <label htmlFor="file" className="p-2 hover:bg-gray-300/30 rounded-full cursor-pointer transition-all duration-300 active:scale-95 text-xl">
                                <FaRegFileImage />
                            </label>
                            <input type="file" name="file" multiple id="file" className="hidden" onChange={handleAddMedia} />
                        </>
                        
                        
                    </>
                </AnimatePresence>
                :
                <>
                    <div className="relative flex justify-center items-center more_btns">
                        <div  className="p-2 hover:bg-gray-300/30 rounded-full cursor-pointer transition-all duration-300 active:scale-95 text-xl" onClick={() => setShow(prev => !prev)}>
                            <FaCirclePlus />
                        </div>
                        <AnimatePresence>
                            {show&&<motion.div
                            initial={{opacity:0,scale:0.8}}
                            animate={{opacity:1,scale:1}}
                            exit={{opacity:0,scale:0.8}}
                            className="absolute bottom-10 text-sm bg-white rounded-lg border w-[150px] max-w-[150px]">
                                <div className="rounded-lg">
                                    <label htmlFor="file" className="p-2 hover:bg-gray-300/30  cursor-pointer transition-all duration-300 active:scale-95  flex items-center gap-1 text-lg rounded-lg">
                                        <FaRegFileImage />
                                        <span className="text-sm text-black">File</span>
                                    </label>
                                    <input type="file" name="file" multiple id="file" className="hidden" onChange={handleAddMedia} />
                                </div>
                                <div className="rounded-lg">
                                    <div
                                    className="p-2 hover:bg-gray-300/30 rounded-lg cursor-pointer transition-all duration-300 active:scale-95 text-lg flex items-center gap-1">
                                        <MdMic />
                                        <span className="text-sm text-black">Voice clip</span>
                                    </div>
                                </div>
                            </motion.div>}
                        </AnimatePresence>
                    </div>
                </>}
            
        </>
    )
}