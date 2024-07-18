
import { removeOverlay } from "@/lib/utils/hooks";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { TfiUpload } from "react-icons/tfi";

export default function CoverImage({coverImage}:{
    coverImage:string|null;

}) {
    const [show,setShow] = useState<boolean>(false)
    removeOverlay({
        tab:".cover-tab",
        setShow:setShow
    })
    
    return (
        <>
            <div className="h-[380px] lg:h-[480px] w-full bg-white-1/60 rounded-xl relative shadow-[0px_0px_3px_1px_rgba(232,229,229,1)] cover-tab  xl:rounded-xl">
                    
                    <div className="bg-gray-300/50 w-full h-full cursor-pointer hover:bg-black/20 active:bg-black/30 transition-all duration-300 xl:rounded-xl" onClick={() => setShow(true)}>
                        {coverImage&&<img 
                        src={coverImage as string}
                        alt=""
                        className="w-full h-full object-cover xl:rounded-xl bg-white-1/60" />}
                    </div>
                    
            
                        
                    
                   <div className="absolute left-0 right-0 bottom-0 flex justify-end px-4 p-4 bg-gradient-to-t from-black/30  to-white-1/10 xl:rounded-b-xl  ">
                        <div className="relative">
                            <div className=" bg-white rounded-lg p-2 font-semibold px-3 flex items-center gap-3 cursor-pointer hover-opacity active:scale-90" onClick={() => setShow(prev => !prev)}>
                                <FaCamera className="text-lg"/>
                                <p className=" cursor-pointer text-sm hidden lg:block">Cover photo</p>
                                
                            </div>
                            
                            {show&&<div className="absolute -bottom-[3.8rem] bg-white rounded-lg p-2 font-semibold w-[250px] right-0 shadow-[0px_0px_3px_1px_rgba(1,2,3,0.4)] z-40">
                                <div className="flex items-center gap-2 p-2 transition-all duration-300 rounded-md hover:bg-gray-300/30 active:bg-gray-300/60 cursor-pointer">
                                    <TfiUpload className="text-xl" />
                                    <p className="cursor-pointer">Upload photo</p>
                                </div>
                            </div>}
                        </div>
                    </div>
                    
                </div>
        </>
    )
}