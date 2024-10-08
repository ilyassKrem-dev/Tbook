import { SetStateAction, useEffect, useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import ConvoEmotes from "./convoEmotes";
import { useSize } from "@/lib/utils/hooks";
type ContentType = {
    text:string;
    medias:{
        id:string;
        url:string;
        type:"audio"|"image"|"video";  
        file:File
    }[];
}

export default function ConvoInput({content,setContent,input,setInput}:{
    input:string;
    setInput:React.Dispatch<SetStateAction<string>>
    content:string;
    setContent:React.Dispatch<SetStateAction<ContentType>>
}) {
    const {w} = useSize()
    const divRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)
    const handleInput = (e:any) => {
        const htmlText = e.target.innerHTML;
        const text = e.target.innerText;
        const regLinks = /\b(?:https?:\/\/(?:www\.)?(?:[\w-]+\.)+[a-z]{2,})(?:\/[\w-./?%&=]*)?/g;
        const changedContent = htmlText.replace(regLinks,(match:any) => {
            return `<a href="#" target="_blank" class=" text-blue-400 underline hover-opacity">${match}</a>`
        })
        setInput(changedContent)
        setContent(prev => ({...prev,text:text}))
    }

    useEffect(() => {
        if (divRef.current) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(divRef.current);
          range.collapse(false); 
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, [input]);
    const handleClick = () => {
        if (divRef.current) {
            const range = document.createRange();
            const selection = window.getSelection();
            const content = divRef.current;

        
            selection?.removeAllRanges();

            
            range.selectNodeContents(content);
            range.collapse(false);

           
            selection?.addRange(range);

          
            content.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }
    useEffect(() => {
        const current = parentRef.current
        if(!current) return
        const parentWidth = current.clientWidth
        if (divRef.current) {
            divRef.current.style.maxWidth = `${parentWidth - 100}px`;
       
        }
    },[parentRef,w])
    return (
        <>
        
            <div
            className={`relative flex items-end justify-end w-full rounded-xl  bg-gray-300/40 `}>
                <div
                ref={parentRef}
                className="rounded-xl   text-base focus-within:outline-none text-black p-1 pl-3 pr-10 w-full max-h-[180px] overflow-y-auto custom-scrollbar cursor-text" onClick={handleClick}
                >
                    <div
                    ref={divRef} 
                    onInput={handleInput} 
                    contentEditable
                    dangerouslySetInnerHTML={{__html:input}} 
                    className={`w-full focus-within:outline-none    text-sm relative z-10 ${content.length>0?"min-w-[200px]":"min-w-[150px]"}`}
                    ></div>
                </div>
                <ConvoEmotes 
                content={content} 
                setContent={setContent} 
                setInput={setInput}/>
                {content.length===0&&
                <div  className="absolute left-3 text-black/60 mb-[0.2px] text-base z-0">
                    <span>Aa</span>
                </div>}
            </div>
        </>
    )
}