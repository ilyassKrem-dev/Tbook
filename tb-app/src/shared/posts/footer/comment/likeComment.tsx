import Comments from "@/lib/classes/Comments"
import { SetStateAction } from "react"
import { useToast } from "@/assets/Wrappers/toastWrapper";



export default function LikeComment({setLikes,userId,comment_id}:{
    setLikes:React.Dispatch<SetStateAction<number>>;
    userId:string;
    comment_id:string
}) {
    const {toast}= useToast()
    const handleLike = async() => {
        const res = await Comments.likeComment(userId,comment_id)
        if(res?.success) {
            if(res.msg=="like removed") {
                return setLikes(prev=>prev-1)
            }
            return setLikes(prev=>prev+1)
        }
        if(res?.success == null) {
            return toast({
                varient:"error",
                title:"Error",
                description:res?.error as string
            })
        }
        if(res.success == false) {
            return toast({
                    varient:"error",
                    title:"Error",
                    description:res.error as string
                })
        }
    }
    return (
        <div className="text-gray-600 cursor-pointer hover:underline transition-all duration-300" onClick={handleLike}>
            Like
        </div>
    )
}