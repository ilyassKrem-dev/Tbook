import { changeContentToLinks } from "@/lib/utils/textUtils";



export default function TextPreview({selectedColor,textStory}:{
    selectedColor:{
        bgColor:string;
        textColor:string;
    },
    textStory:string
}) {
    const {bgColor,textColor} = selectedColor
    const text = changeContentToLinks(textStory)
    return (
        <div 
        className="flex justify-center items-center w-full h-full rounded-md max-w-[436px]"
        style={{backgroundColor:bgColor}}>
            <p 
            className="break-words text-center text-lg  font-medium  max-w-[300px]"
            dangerouslySetInnerHTML={{__html:text ? text : "START TYPING"}}
            style={{color:textColor}} />
        </div>
    )
}