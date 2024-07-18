import { HiOutlineFaceSmile } from "react-icons/hi2";
import EmojiPicker from "emoji-picker-react";
import { removeOverlay } from "@/lib/utils/hooks";
import { SetStateAction, useEffect, useState } from "react";


export default function Emotes({setTranformedText,setPostText}:{
    setTranformedText:React.Dispatch<SetStateAction<string>>;
    setPostText:React.Dispatch<SetStateAction<string>>
}) {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [pickerWidth, setPickerWidth] = useState<number>(250);
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
    removeOverlay(
        {
            tab:".emojy-tab",
            setShow:setShowPicker
        }
    )
    return (
        <>
            <div className=" absolute bottom-2 right-6 text-3xl text-gray-500/80 cursor-pointer hover-opacity emojy-tab">
                <div className="relative">
                    <HiOutlineFaceSmile onClick={() => setShowPicker(prev=>!prev)}/>
                    {showPicker && (
                        <div className="absolute -top-[29rem] md:-left-[12rem] -left-[11rem] max-[300px]:-left-[11rem] background">
                            <EmojiPicker lazyLoadEmojis width={pickerWidth} onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
