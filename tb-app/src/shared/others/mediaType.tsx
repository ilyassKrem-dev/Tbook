

import { MdAudiotrack } from "react-icons/md";
import { FaPlay } from "react-icons/fa";


export default function MediaType({media,type,className,controll}:{
    media:string;
    type:"image"|"audio"|"video";
    className?:string;
    controll?:boolean
}) {
    if(type=="video") {
        return (
            <div className={`"relative flex items-center justify-center flex-col h-full w-full bg-white/50  ${className}`}>
                <video 
                src={media} 
                className={className + " h-full w-full"}
                controls={controll}>
                    
                </video>
                <div className="absolute">
                    <FaPlay  className="text-xl text-gray-500/80"/>
                </div>
            </div>
            
        )
    }
    if(type=="audio") {
        return (
            <div className={`relative flex items-center justify-center flex-col h-full w-full border bg-white/50 ${className}`}>
                <audio src={media} className={className} controls={controll}></audio>
                <div className="absolute">
                    <MdAudiotrack  className="text-xl text-gray-500/80"/>
                </div>
            </div>
        )
    }
    if(type=="image") {
        return (
            <img src={media} alt="picture" className={className}/>
        )
    }
}