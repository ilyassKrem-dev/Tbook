import { HiOutlineFaceSmile } from "react-icons/hi2";
import EmojiPicker from "emoji-picker-react";
import { SetStateAction, useEffect, useState } from "react";


export default function Emotes({setTranformedText,setPostText,className}:{
    setTranformedText:React.Dispatch<SetStateAction<string>>;
    setPostText:React.Dispatch<SetStateAction<string>>;
    className?:string
}) {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [pickerWidth, setPickerWidth] = useState<number>(250);
    const [clicked,setClicked] = useState<boolean>(false)
    const handleEmojiClick = (emoji: any) => {
        const emj = emoji.emoji
        setPostText(prev => prev + " " + emj)
        setTranformedText(prev => prev +" " + emj)
    };
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
            <div className={`absolute bottom-2 right-6 ${className ? className : "text-3xl"}  text-gray-500/80 cursor-pointer  emojy-tab z-40`}>
                <div className="relative">
                    <div className="hover-opacity">
                        <HiOutlineFaceSmile onClick={() => {
                        setClicked(true)
                        setShowPicker(prev=>!prev)}}/>
                    </div>
                    {showPicker && (
                        <div className="absolute -top-[29rem] md:-left-[12rem] -left-[11rem] max-[300px]:-left-[11rem] background">
                            <EmojiPicker 
                            lazyLoadEmojis 
                            width={pickerWidth}
                            searchDisabled 
                            onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
