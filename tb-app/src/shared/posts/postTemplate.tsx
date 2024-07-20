
import PostHeader from "@/shared/posts/postHeader";
import PostFooter from "@/shared/posts/postFooter";
import PostBtns from "@/shared/posts/postBtns";
import { PostUserType, UserType } from "@/lib/utils/types/user";
import PostContent from "./postContent";
import { PostType } from "@/lib/utils/types/post";
export default function PostTemplate({userInfo,user,post}:{
    userInfo:PostUserType;
    user:UserType | null;
    post:PostType
}) {
    
    const isLiked = post.likes.some((like) => like.user_id === user?.id)
    return (
        <>
            <div className=" py-3 rounded-lg bg-white  sm-shadow">
                <PostHeader 
                userImage={userInfo.image}
                userName={userInfo.name}
                date={post.created_at}/>
                <PostContent 
                content={post.content} 
                medias={post.medias}/>
                {user&&<PostBtns 
                userId={user?.id as string} 
                isLiked={isLiked}
                postId={post.id}/>}
                <PostFooter user={user}/>
            </div>
        </>
    )
}