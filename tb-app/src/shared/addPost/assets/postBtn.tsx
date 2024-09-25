
import Posts from "@/lib/classes/Posts"
import { DefaultPostType, MediaType } from "@/lib/utils/types/post"
import { SetStateAction, useState } from "react";
import { useToast } from "@/assets/Wrappers/toastWrapper";
import { useUploadThing } from "@/lib/utils/uploadthing";
interface Props {
    medias:MediaType[];
    postText:string;
    status:string;
    userId:string;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    setPosts?:React.Dispatch<SetStateAction<DefaultPostType[]>>
}

export default function PostBtn(
    {medias,postText,status,userId,setShow,setPosts}:Props) 
    {
    const [progress,setProgress] = useState<number>(0)
    const {toast} = useToast()
    const {startUpload} = useUploadThing("media",{
        onUploadProgress:(p) =>(setProgress(p))
    })

    const handleUplaod = async() => {
        if(medias.length === 0) return []
        const mediasUploaded:any[] = []
        try {
            await Promise.all(medias.map(async (med, index) => {
                const uploadedFile = await startUpload([med.file]);
                if (uploadedFile && uploadedFile[0]?.url) {
                    
                    mediasUploaded[index] = {url:uploadedFile[0].url,type:med.type};
                }
            }));
            return mediasUploaded
        } catch (error) {
            setProgress(0)
            return toast({
                varient:"error",
                title:"Erorr",
                description:"Failed to upload"
            })
        }
    }
    const handleAdd = async() => {
        if(!postText && medias.length === 0 || progress) return
        setProgress(10)
        try {
            const mediaRes = await handleUplaod()
            const data ={
                content:postText,
                medias:mediaRes as [],
                status:status,
                user_id:userId
            }
            const res = await Posts.addPost(data)
            if(res?.success) {
                setProgress(100)
                setShow(false)
                if(setPosts) {
                    setPosts((prev:any) => ([res.data,...prev]))
                }
                return toast({
                    varient:"success",
                    title:"Posted",
                    description:"Post has been created"
                })
            }
            if(res?.success == null) {
                setProgress(0)
                return toast({
                    varient:"error",
                    title:"Error",
                    description:res?.errors as string
                })
            }
            if(!res?.success) {
                setProgress(0)
                return toast({
                    varient:"error",
                    title:"Error",
                    description:"Internal server error,try again later"
                })
            }
        } catch (error) {
            setProgress(0)
            return toast({
                varient:"error",
                title:"Erorr",
                description:"Failed to send post"
            })
        }
    }
    return (
        <div className="px-4 p-2 w-full">
            <button className={`rounded-lg  p-2 text-base font-medium bg-gray-300/80 px-4 w-full hover-opacity active:scale-90 disabled:text-black/50 relative`} 
            disabled={!postText && medias.length == 0} onClick={handleAdd}>
                <p className="relative z-30 cursor-pointer">{progress?progress+"%":'Post'}</p>
            
                {progress?<div 
                className={`absolute left-0 top-0 bottom-0 h-full  bg-green-1 rounded-lg z-20`}
                style={{width:`${progress}%`}}></div>:""}
            </button>
        </div>
    )
}