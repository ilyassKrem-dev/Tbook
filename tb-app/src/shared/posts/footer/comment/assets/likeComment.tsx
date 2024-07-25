import Comments from "@/lib/classes/Comments"
import { SetStateAction } from "react"
import { useToast } from "@/assets/Wrappers/toastWrapper";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";


export default function LikeComment({setLikes,comment_id,postId}:{
    setLikes:React.Dispatch<SetStateAction<number>>;
    comment_id:string;
    postId:string
}) {
    const {user} = loginInfo()
    const {toast}= useToast()
    const handleLike = async() => {
        if(!user) return
        const res = await Comments.likeComment(user?.id as string,comment_id,postId)
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