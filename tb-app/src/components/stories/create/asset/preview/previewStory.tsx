
import {  SetStateAction} from "react";

import TextPreview from "../text/textPreview";
import PhotoPreview from "../photo/photoPreview";


export default function PreviewStory({textStory,selectedColor,story,photoStory,setPhotoStory}:{
    selectedColor:{
        bgColor:string;
        textColor:"black"|"white"; 
    };
    photoStory:{
        media:string;
        file:File[];
        class:{
            scale:number;
            rotate:number
        }
    };
    setPhotoStory:React.Dispatch<SetStateAction<{
        media:string;
        file:File[];
        class:{
            scale:number;
            rotate:number
        }
    }>>
    textStory:string;
    story:"text"|"photo"
}) {
    
    
    return (
        <div className="h-full justify-center items-center flex py-14 px-8 flex-1">
            <div className="bg-white rounded-md shadow-lg h-full w-full p-4 flex gap-3 flex-col max-w-[1000px]">
                <h1 className="font-medium">Preview</h1>
                <div className=" h-full">
                    <div className="bg-black/90 rounded-md w-full h-full py-3 px-4 flex justify-center items-center flex-col overflow-hidden">
                        {story=="text"&&<TextPreview selectedColor={selectedColor} textStory={textStory}/>}
                        {story=="photo"&&<PhotoPreview 
                        photoStory={photoStory} 
                        setPhotoStory={setPhotoStory}
                        textStory={textStory}
                        selectedColor={selectedColor}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}