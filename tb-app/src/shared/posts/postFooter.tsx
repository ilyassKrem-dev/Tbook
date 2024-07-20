import { UserType } from "@/lib/utils/types/user"
import Emotes from "../addPost/assets/emotes"
import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";



export default function PostFooter({user}:{
    user:UserType | null
}) {
    const [postText, setPostText] = useState<string>('');
    const [transformedText,setTranformedText] = useState<string>("")
    const [clicked,setClicked] = useState<boolean>(false)
    const editableDivRef = useRef<HTMLDivElement>(null);
    const handleChange = (event:any) => {
        if(!clicked) {
            setClicked(true)
        }
        
        const text = event.target.innerHTML
        setPostText(text);
        const lastText = Array.from(text)[text.length -1] as string
        const reg = /;/
        if (reg.test(lastText)) {
            const reg = /@\w+/g;
            const replacedContent = text.replace(reg, (match:any) => {
                return `<a href="#" class='text-blue-400 underline'>${match}</a>`;
            });
    
            return setTranformedText(replacedContent);
        }
        return setTranformedText(text)   
       
    };
    const handleClick = () => {
        if(postText) return
        setClicked(prev=>!prev)
        editableDivRef.current?.focus()
    }
    useEffect(() => {
        
        if (editableDivRef.current) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(editableDivRef.current);
          range.collapse(false); 
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, [transformedText]);
    return (
        <>
            {user&&
                <div className="mt-4 px-4">
                    <div className={`flex gap-1 items-center`}>
                        <div className="w-[32px] h-[32px] rounded-full">
                            <img 
                            src={user?.image ? user?.image: "/profile.jpg"} 
                            alt={`${user?.name} image`}
                            className="rounded-full w-full h-full object-cover" />
                        </div>
                        <div className="w-full">
                            <div className={`w-full flex ${clicked?"flex-col":"flex-row"} bg-gray-500/10 p-[0.39rem] rounded-lg`}>
                                <div
                                onClick={handleClick} 
                                className={`w-full focus-within:outline-none resize-none  custom-scrollbar  font-noto  rounded-lg   relative flex items-center cursor-text`}
                                >
                                    <div
                                    ref={editableDivRef}
                                    contentEditable 
                                    onInput={handleChange}
                                    dangerouslySetInnerHTML={{__html:transformedText}}
                                    className=" w-full focus-within:outline-none resize-none  max-h-[100px]  px-[0.3rem] custom-scrollbar overflow-y-auto font-noto max-w-[550px]">

                                    </div>
                                    {!postText&&<p
                                      className="absolute left-1 top-[0.1rem] text-base text-gray-500/60  w-fit cursor-text">
                                        Write a comment...
                                    </p>}
                                    
                                </div>
                                <div className={`relative flex justify-between pt-3  ${clicked?"px-2":" justify-end"}`}>
                                    <div className="relative" onClick={() => setClicked(true)}>
                                        <Emotes 
                                        setTranformedText={setTranformedText}
                                        setPostText={setPostText}
                                        className={`text-2xl  !bottom-0 ${!clicked?"-right-1":"left-0 right-auto"}`}/>
                                    </div>
                                    {clicked&&
                                    <button className="cursor-pointer hover-opacity disabled:text-gray-500/60 text-dark disabled:cursor-default" disabled>
                                        <IoMdSend className="text-2xl"/>
                                    </button>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}