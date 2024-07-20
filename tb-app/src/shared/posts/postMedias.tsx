import { PostMediaType } from "@/lib/utils/types/post"
import MediaType from "../others/mediaType"


const h = 600

export default function PostMedias({medias}:{
    medias:PostMediaType[]
}) {
    
    return (
        <div className="w-full flex flex-col gap-[3px] items-center justify-center">
            {medias.length === 1
            ?
            <MediaType 
            media="/profile.jpg" 
            type="image"
            className="w-full object-fill min-h-[300px] max-h-[600px]"controll={true}/>
            :
            medias.length == 2
            ?
            <div className="flex  gap-[3px] flex-col  md:flex-row w-full lg:flex-col xl:flex-row ">
                <MediaType 
                media="/profile.jpg" 
                type="image"
                className="w-full object-fill min-h-[300px] max-h-[300px]" controll={true}/>
                <MediaType 
                media="/profile.jpg" 
                type="image"
                className="w-full object-fill min-h-[300px] max-h-[300px]" controll={true}/>
            </div>
            :
            medias.length === 3
            ?

            <>
                <MediaType 
                media="/profile.jpg" 
                type="image"
                className="w-full object-fill min-h-[300px] max-h-[350px] " controll={true}/>
                <div className="flex  gap-[3px] flex-col md:flex-row w-full items-center justify-center">
                    <MediaType 
                    media="/profile.jpg" 
                    type="image"
                    className=" object-fill min-h-[300px] max-h-[300px] w-full  md:max-w-[300px] lg:max-w-full" controll={true}/>
                    <div className="relative w-full md:w-fit lg:w-full">
                        <MediaType 
                        media="/profile.jpg" 
                        type="image"
                        className="object-fill min-h-[300px] max-h-[300px] w-full  md:max-w-[300px]  lg:max-w-full" controll={true}/>
                    </div>
                </div>
            </>
            :
            <>
                <MediaType 
                media="/profile.jpg" 
                type="image"
                className="w-full object-fill min-h-[300px] max-h-[350px] " controll={true}/>
                <div className="flex  gap-[3px] flex-col md:flex-row w-full items-center justify-center">
                    <MediaType 
                    media="/profile.jpg" 
                    type="image"
                    className=" object-fill min-h-[300px] max-h-[300px] w-full  md:max-w-[300px] lg:max-w-full" controll={true}/>
                    <div className="relative w-full md:w-fit lg:w-full">
                        <MediaType 
                        media="/profile.jpg" 
                        type="image"
                        className="object-fill min-h-[300px] max-h-[300px] w-full  md:max-w-[300px]  lg:max-w-full" controll={true}/>
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-400/80 flex justify-center items-center flex-col text-lg text-gray-600 font-bold cursor-pointer hover-opacity">
                            +{medias.length - 3}
                            <p className="cursor-pointer">More</p>
                            
                        </div>
                    </div>
                </div>
            </>
            }
            
        </div>
    )
}