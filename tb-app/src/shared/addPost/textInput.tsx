import { SetStateAction, useEffect, useRef } from "react"


interface Props {
    transformedText:string
    setPostText:React.Dispatch<SetStateAction<string>>
    setTranformedText:React.Dispatch<SetStateAction<string>>
}

export default function TextInput({transformedText,setPostText,setTranformedText}:Props) {
    const editableDivRef = useRef<HTMLDivElement>(null);
    const handleChange = (event:any) => {
        const text = event.target.innerHTML
        setPostText(text);
        event.target.style.height = '100px';
        event.target.style.height = `${event.target.scrollHeight}px`;
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
        <div className="relative flex justify-center items-center">
            <div 
            ref={editableDivRef}
            onInput={handleChange}
            contentEditable
            className={`w-full focus-within:outline-none resize-none h-[100px] max-h-[200px] custom-scrollbar overflow-y-auto font-noto`}
            dangerouslySetInnerHTML={{ __html: transformedText }}>
                
                
            </div>
            {!transformedText&&<div className="absolute left-0 -top-[0.1rem] text-gray-500/60 ">
                What's on your mind?
            </div>}
        </div>
    )
}