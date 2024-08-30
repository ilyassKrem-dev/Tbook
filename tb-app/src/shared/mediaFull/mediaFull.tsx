import { RxCross2 } from "react-icons/rx"
import { GoDownload } from "react-icons/go";
import Link from "next/link"
import { MediaFullType } from "./mediaFullType";
import { useState } from "react";
import MediaType from "../others/mediaType";
import { IoIosArrowBack } from "react-icons/io";

export default function MediaFull({clickedMedia,handleMediaClick}:{
    clickedMedia:MediaFullType;
    handleMediaClick:(arg:MediaFullType|null) => void
}) {
    const {info,medias,media} = clickedMedia
    const [showenMedia,setShowenMedia] = useState(media)
    const handleDownload = async (url: string, name: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = name; 
            document.body.appendChild(link);
            link.click(); 
            document.body.removeChild(link); 
    
            
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    const handleClose = () => {
        handleMediaClick(null)
    }
    
    const handleSwitch = (dirc:string) => {
        const findIndex = medias.indexOf(showenMedia)
       
        if(dirc == "right") {
           
            if(findIndex === medias.length - 1) {
                return setShowenMedia(medias[0])
            }
            return setShowenMedia(medias[findIndex + 1])
        }
        if(findIndex === 0) {
            return setShowenMedia(medias[medias.length - 1])
        }
        return setShowenMedia(medias[findIndex - 1])
    }
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/90 z-50  no-doc-scroll flex justify-center items-center">
            <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-0 blur-xl" style={{
            backgroundImage:showenMedia.type==="image"?`url(${showenMedia.url})`:"",
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            
            }}></div>
            <div className="flex flex-col  relative z-10  h-full w-full bg-black/90 p-3">
                <div className="flex flex-col justify-center h-full w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center self-start">
                            <Link href={`/profile/${info.username}`} className="w-[40px] h-[40px] rounded-full">
                                <img 
                                src={info.image??"/profile.jpg"}
                                alt=""
                                className="w-full h-full rounded-full object-cover bg-white border" />
                            </Link>
                            <div className="text-white flex flex-col">
                                <Link href={`/profile/${info.username}`} className=" font-bold hover:underline transition-all duration-300 active:scale-95">{info.name}</Link>
                                <p className="text-xs text-white/80">@{info.username}</p>
                            </div>
                        </div>
                        <div className="pr-4 flex items-center gap-6 self-start">
                            <div className="rounded-full p-1 text-3xl text-white hover:bg-black/40 active:scale-95 transition-all duration-300 cursor-pointer" onClick={() => handleDownload(showenMedia.url,"Tb-download")}>
                                <GoDownload  />
                            </div>
                            <div className="rounded-full p-1 text-3xl text-white hover:bg-black/40 active:scale-95 transition-all duration-300 cursor-pointer" onClick={handleClose}>
                                <RxCross2 />
                            </div>
                        </div>

                    </div>
                    <div className=" flex justify-center items-center relative flex-1">
                        
                        <MediaType 
                        media={showenMedia.url}
                        type={showenMedia.type}
                        controll={true}
                        className={` max-h-[500px] 
                        ${showenMedia.type !=="image"?"max-w-[80%] rounded-md":""}`}/>
                    </div>
                </div>
                <div className="self-center flex gap-2">
                    {medias.map((med,index) => {
                        const checkMedia = med.id === showenMedia.id
                        
                        return (
                            <div key={index} className={`w-[50px] h-[50px] rounded-md cursor-pointer  group/photoSmall hover:bg-black/30 transition-all duration-300 active:scale-95 ${checkMedia ?" scale-125" :""}`} onClick={() => setShowenMedia(med)}>
                                <MediaType 
                                media={med.url}
                                type={med.type}
                                controll={false}
                                className={`w-full h-full rounded-md object-cover bg-white border border-black/30 group-hover/photoSmall:opacity-70 transition-all duration-300 `}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            {medias.length>1
            &&
            <>
                <div className="absolute left-0 text-3xl sm:bg-gray-300 rounded-full sm:p-2 p-1 ml-2 z-40 sm:ml-4 bg-white cursor-pointer active:scale-95 hover-opacity" onClick={() => handleSwitch("left")}>
                    <IoIosArrowBack />
                </div>
                <div className="absolute right-0 text-3xl sm:bg-gray-300 rounded-full sm:p-2 p-1 mr-2 sm:mr-8 bg-white rotate-180 cursor-pointer active:scale-95 hover-opacity z-40" onClick={() => handleSwitch("right")}>
                    <IoIosArrowBack />
                </div>
            </>}
        </div>
    )
}