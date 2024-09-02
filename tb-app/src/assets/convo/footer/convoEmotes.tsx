import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { SetStateAction, useState, useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";




export default function ConvoEmotes({setInput,setContent,className,content}:{
    setInput:React.Dispatch<SetStateAction<string>>;
    setContent:React.Dispatch<SetStateAction<any>>;
    className?:string;
    content:string
}) {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [pickerWidth, setPickerWidth] = useState<number>(250);
    const [clicked,setClicked] = useState<boolean>(false)
    
    const handleEmojyClick = (emoji: EmojiClickData) => {
        const emj = emoji.emoji
        setContent((prev:any) => ({...prev,text:content+emj}))
        setInput(prev => (
            prev + `<span class="font-noto">${emj}</span>`
        ))
    }
    useEffect(() => {
        const updatePickerWidth = () => {

            const screenWidth = window.innerWidth;
            const newWidth =Math.min(Math.max(250,screenWidth / 4),350); 
            setPickerWidth(newWidth);
        };

        updatePickerWidth();
        window.addEventListener("resize", updatePickerWidth);

       
        return () => {
            window.removeEventListener("resize", updatePickerWidth);
        };
    }, []);
    useEffect(() => {
        if(clicked) return
        const removeOv = (e:any) => {
            const overlay = document.querySelector(".emojy-tab")
            if(overlay && !overlay.contains(e.target)) {
                setShowPicker(false)
            }
        }
        document.addEventListener('click',removeOv)
    
        return () => document.removeEventListener('click',removeOv)
  
    },[clicked])

    useEffect(() => {
        if(!clicked) return
        const id = setTimeout(() => {
            setClicked(false)
        },10)

        return () => clearTimeout(id)
    },[clicked])
    return (
        <>
            <div className={`absolute right-1 text-lg cursor-pointer transition-all duration-300 hover:bg-gray-300/40 p-1 rounded-full emojy-tab z-40`}>
                <div className="relative">
                    <BsEmojiSmileFill   onClick={() => {
                    setClicked(true)
                    setShowPicker(prev=>!prev)}}/>
               
                    {showPicker && (
                        <div className="absolute -top-[29rem]  -left-[12.5rem] max-[300px]:-left-[11rem] background">
                            <EmojiPicker lazyLoadEmojis width={pickerWidth} onEmojiClick={handleEmojyClick}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}