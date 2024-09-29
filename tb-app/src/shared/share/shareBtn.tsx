import { useToast } from "@/assets/Wrappers/toastWrapper";
import PostMisc from "@/lib/classes/Posts.misc/PostMisc";
import { SetStateAction, useState } from "react";




export default function ShareBtn({postId,userId,content,setShowShare}:{
    postId:string;
    userId:string;
    content:string;
    setShowShare:React.Dispatch<SetStateAction<boolean>>;
}) {
    const [loading,setLoading] = useState<boolean>(false)
    const {toast} = useToast()
    const handleShare = async() => {
        if(loading) return
        setLoading(true)
        const res = await PostMisc.sharePost({
            user_id:userId,
            content,
            postId
        })
        if(res?.success) {
            setLoading(false)
            toast({
                varient:"success",
                title:"Shared",
                description:"Post has been shared"
            })
            setShowShare(false)
        } else {
            setLoading(false)
            toast({
                varient:"error",
                title:"Error",
                description:"Error, Something happened, try again later!"
            })
        }

    }
    return (
        <button className="bg-blue-500 rounded-md px-6 text-base font-semibold self-end w-fit text-white py-2 hover-opacity" onClick={handleShare}>Share now</button>
    )
}