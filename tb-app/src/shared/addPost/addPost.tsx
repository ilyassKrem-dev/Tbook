
import {   SetStateAction,  useEffect,  useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Emotes from "./assets/emotes";
import TextInput from "./assets/textInput";
import AddMedia from "./assets/addMedia";
import SetPostWatch from "./assets/setPostWatch";
import MediaType from "../others/mediaType";
import { UserType } from "@/lib/utils/types/user";
import PostBtn from "./assets/postBtn";
import { ViewPrivacyType } from "@/lib/utils/types/user.misc/user.privacy";
import UserPivacy from "@/lib/classes/User.misc/UserPrivacy";
type MediaType = {
    id:string;
    file:File;
    media:string
    type:"image"|"video"|"audio"
}

export default function AddPost({user,setShow}:{
    user:UserType;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    const [postText, setPostText] = useState<string>('');
    const [transformedText,setTranformedText] = useState<string>("")
    const [medias,setMedias] = useState<MediaType[]>([])
    const [status,setStatus] = useState<ViewPrivacyType|null>(null)
    const handleRemoveMedia = (media:MediaType) => {
        setMedias(prev => {
            return prev.filter((med) => med.id !== media.id)
        })
    }
    
    useEffect(() => {
        if(!user) return
        const getPostStatus = async() => {
            const res = await new UserPivacy(user.id).getuserPrivacy()
            if(res?.success) {
                setStatus((res.data as any).posts || "public")
            } else {
                setStatus("public")
            }
        }
        getPostStatus()
    },[user])
    
    return (
        <>
            <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-white/50 z-50 no-doc-scroll" onClick={() => setShow(false)}>
                {status&&<div className="flex flex-col gap-1 bg-white rounded-lg  shadow-[0px_0px_4px_1px_rgba(232,229,229,1)] w-full max-w-[500px] post-tab" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center font-bold items-center border-b border-white-1 p-3 relative">
                        
                        <h1 className="text-xl flex-1 text-center">Create post</h1>
                        <div className="absolute text-2xl p-2 rounded-full bg-gray-300/60 cursor-pointer hover-opacity active:scale-90 right-3" onClick={() => setShow(false)}>
                            <RxCross2 />
                            
                        </div>
                    </div>
                   <SetPostWatch 
                    profileImage={user.image}
                    profileName={user.name}
                    status={status}
                    setStatus={setStatus}/>
                    <div className="p-2 px-4 relative pb-5 ">
                        <TextInput 
                        setPostText={setPostText}
                        setTranformedText={setTranformedText}
                        transformedText={transformedText}/>
                        <Emotes setPostText={setPostText} setTranformedText={setTranformedText}/>
                    </div>
                    {medias.length>0&&
                    <div className="h-[250px] p-2 px-4  max-h-[250px]">
                        <div className="rounded-xl border h-full p-2 overflow-y-auto custom-scrollbar flex flex-wrap gap-3 relative">
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
                    <PostBtn 
                    postText={postText}
                    medias={medias}
                    status={status}
                    setShow={setShow}
                    userId={user.id}/>
                    
                </div>}
            </div>
        </>
    )
}