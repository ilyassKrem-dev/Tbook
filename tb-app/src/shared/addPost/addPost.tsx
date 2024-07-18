import { FullUserType } from "@/lib/utils/types/user"
import {   SetStateAction,  useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Emotes from "./emotes";
import TextInput from "./textInput";
import AddMedia from "./addMedia";
import SetPostWatch from "./setPostWatch";
import MediaType from "../others/mediaType";
import { removeOverlay } from "@/lib/utils/hooks";

type MediaType = {
    id:string;
    file:File;
    media:string
    type:"image"|"video"|"audio"
}

export default function AddPost({user,setShow}:{
    user:FullUserType;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    const [postText, setPostText] = useState<string>('');
    const [transformedText,setTranformedText] = useState<string>("")
    const [medias,setMedias] = useState<MediaType[]>([])
    
    const handleRemoveMedia = (media:MediaType) => {
        setMedias(prev => {
            return prev.filter((med) => med.id !== media.id)
        })
    }
    removeOverlay(
        {
            tab:".post-tab",
            setShow
        }
    )
    return (
        <>
            <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-white/50 z-50 no-doc-scroll ">
                <div className="flex flex-col gap-1 bg-white rounded-lg  shadow-[0px_0px_4px_1px_rgba(232,229,229,1)] w-full max-w-[500px] post-tab">
                    <div className="flex justify-center font-bold items-center border-b border-white-1 p-3 relative">
                        
                        <h1 className="text-xl flex-1 text-center">Create post</h1>
                        <div className="absolute text-2xl p-2 rounded-full bg-gray-300/60 cursor-pointer hover-opacity active:scale-90 right-3" onClick={() => setShow(false)}>
                            <RxCross2 />
                            
                        </div>
                    </div>
                    <SetPostWatch 
                    profileImage={user.image}
                    profileName={user.name}/>
                    <div className="p-2 px-4 relative pb-5">
                        <TextInput 
                        setPostText={setPostText}
                        setTranformedText={setTranformedText}
                        transformedText={transformedText}/>
                        <Emotes setPostText={setPostText} setTranformedText={setTranformedText}/>
                    </div>
                    {medias.length>0&&<div className="h-[250px] p-2 px-4  max-h-[250px]">
                        <div className="rounded-xl border h-full p-2 overflow-y-auto custom-scrollbar flex flex-wrap gap-3">
                            {medias.map((med,index) => {
                                const {type,media} = med
                                return (
                                    <div key={index} className="w-[100px] h-[100px] rounded-lg border-2 relative">
                                        <MediaType
                                         media={media}
                                         type={type}
                                         className="w-full h-full rounded-lg object-cover"/>

                                        <div className="absolute text-xl p-1 rounded-full bg-accent text-white cursor-pointer hover-opacity active:scale-90 right-1 top-1" onClick={() => handleRemoveMedia(med)}>
                                            <RxCross2 />
                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                    <AddMedia setMedias={setMedias}/>
                    <div className="px-4 p-2 w-full">
                        <button className="rounded-lg  p-2 text-base font-medium bg-gray-300/80 px-4 w-full hover-opacity active:scale-90 disabled:text-black/50" disabled={!postText} >
                        Post
                    </button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}