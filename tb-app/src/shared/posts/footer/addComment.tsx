import { IoMdSend } from "react-icons/io";
import Emotes from "@/shared/addPost/assets/emotes";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Comments from "@/lib/classes/Comments";
import { useToast } from "@/assets/Wrappers/toastWrapper";
import { CommentType, FCommentType } from "@/lib/utils/types/post";

export default function AddComment({userId,userName,userImage,postId,setComment,commentId,setComments,isReply}:{
    userId:string;
    userName:string;
    userImage:string|null;
    postId:string;
    setComment?:React.Dispatch<SetStateAction<FCommentType|null>>;
    setComments?:React.Dispatch<SetStateAction<CommentType[]>>;
    commentId?:string|null;
    isReply?:boolean
}) {
    const [postText, setPostText] = useState<string>('');
    const [transformedText,setTranformedText] = useState<string>("")
    const [clicked,setClicked] = useState<boolean>(false)
    const editableDivRef = useRef<HTMLDivElement>(null);
    const {toast} = useToast()
    const handleChange = (event:any) => {
        if(!clicked) {
            setClicked(true)
        }
        
        const text = event.target.innerText
        setPostText(text);
        
        const htmlText = event.target.innerHTML
        const lastText = Array.from(htmlText)[htmlText.length -1] as string
        const reg = /;/
        if (reg.test(lastText)) {
            const reg = /@\w+/g;
            const replacedContent = htmlText.replace(reg, (match:any) => {
                return `<a href="#" class='text-blue-400 underline'>${match}</a>`;
            });
    
            return setTranformedText(replacedContent);
        }
        return setTranformedText(htmlText)   
       
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


    const  handleComment = async() => {
        if(!postText) return
        const res = await Comments.addComment({
            user_id:userId,
            post_id:postId,
            parent_id:commentId || null,
            content:postText
        })
        if(res?.success) {
            setPostText("")
            setTranformedText("")
            setClicked(false)
            if(setComment) {
                return setComment(res.data as any)
            } 
            if(setComments) {
                return setComments((prev:any)=>([res.data,...prev]))
            }
        }
        if(res?.success == null) {
            return toast({
                varient:"error",
                title:"Error",
                description:res?.error as string
            })
        }
    }
    return (
        <>
            <div className="mt-4 px-4">
                    <div className={`flex gap-1 items-center`}>
                        <div className="w-[32px] h-[32px] rounded-full self-start">
                            <img 
                            src={userImage ? userImage: "/profile.jpg"} 
                            alt={`${userName} image`}
                            className="rounded-full w-full h-full object-cover border bg-white" />
                        </div>
                        <div className="w-full">
                            <div className={`w-full flex ${clicked?"flex-col":"flex-row"} bg-gray-500/10 p-[0.39rem] rounded-lg max-w-[220px] sm:max-w-[450px] md:max-w-full`}>
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
                                        {!isReply?"Write a comment...":"Write a reply..."}
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
                                    <button className="cursor-pointer hover-opacity disabled:text-gray-500/60 text-dark disabled:cursor-default" disabled={!postText} onClick={handleComment}>
                                        <IoMdSend className="text-2xl"/>
                                    </button>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}