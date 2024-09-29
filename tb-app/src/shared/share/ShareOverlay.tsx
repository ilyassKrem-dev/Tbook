import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper";
import { SetStateAction, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import TextInput from "../addPost/assets/textInput";
import Emotes from "../addPost/assets/emotes";
import { FaLink } from "react-icons/fa";
import { useToast } from "@/assets/Wrappers/toastWrapper";
import ShareBtn from "./shareBtn";



export default function ShareOverlay({setShowShare,postUsername,postId}:{
    setShowShare:React.Dispatch<SetStateAction<boolean>>;
    postUsername:string;
    postId:string;
}) {
    const {user} = useLoginInfo()
    const [postText, setPostText] = useState<string>('');
    const [transformedText,setTranformedText] = useState<string>("")
    const {toast} = useToast()
    const handleCopy = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}/profile/${postUsername}/posts/${postId}`)
        setShowShare(false)
        toast({
            varient:"success",
            title:"Copied",
            description:"Link copied"
        })
    }
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-50 bg-white/60" onClick={() => setShowShare(false)}>
            <div className="w-[300px] sm:w-[400px] md:w-[500px] rounded-lg bg-white shadow-lg border border-black/20 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="relative p-3 flex justify-center items-center border-b border-black/20">
                    <h1 className="font-bold text-lg">
                        Share    
                    </h1>
                    <div className="absolute right-3 bg-gray-300/60 rounded-full p-2 active:scale-95 hover:bg-gray-300 cursor-pointer text-2xl" onClick={() => setShowShare(false)}>
                        <RxCross2 />
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                    <>
                        {!user&&
                        <div className="flex items-center gap-2">
                            <div className="rounded-full w-[40px] h-[40px] bg-gray-500/70 animate-pulse" />
                            <div className="flex flex-col gap-1">
                                <div className="bg-gray-500/70 animate-pulse p-1 rounded-full w-[100px]" />
                                <div className="bg-gray-500/70 animate-pulse p-1 rounded-md w-[100px] h-[20px]" />
                            </div>
                        </div>}
                        {user&&
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full w-[40px] h-[40px]">
                                <img 
                                src={user?.image ?? "/profile.jpg"} 
                                alt={`${user.name} image`}
                                className="w-full h-full rounded-full object-cover bg-white border" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-semibold text-base">{user.name}
                                </p>
                                <div className="p-[0.1rem] px-3 flex gap-1 bg-gray-300/70 rounded-md">
                                    <div className="text-base">
                                        <FaUserFriends />
                                    </div>
                                    <span className="font-semibold text-sm">Friends</span>
                                </div>
                            </div>
                        </div>}
                    </>
                    <div className="flex flex-col gap-1">
                        <div className="py-2 relative pb-5 ">
                            <TextInput 
                            setPostText={setPostText}
                            setTranformedText={setTranformedText}
                            transformedText={transformedText}/>
                            <Emotes setPostText={setPostText} setTranformedText={setTranformedText}/>
                        </div>
                        {user&&
                        <ShareBtn 
                        postId={postId}
                        userId={user.id}
                        content={postText}
                        setShowShare={setShowShare}
                        />}
                    </div>
                    
                </div>
                <div className="border-t border-black/20 p-3">
                    <div className="flex flex-col gap-1 hover:bg-gray-300/40 rounded-md p-2 w-fit items-center cursor-pointer pb-5 transition-all duration-300 group" onClick={handleCopy}>
                        <div className="p-4 text-2xl rounded-full bg-gray-300/70 group-hover:bg-gray-300 group-active:scale-95 transition-all duration-300 w-fit">
                            <FaLink />
                        </div>
                        <p className="text-sm cursor-pointer">Copy link</p>     
                    </div>
                </div>
            </div>
        </div>
    )
}