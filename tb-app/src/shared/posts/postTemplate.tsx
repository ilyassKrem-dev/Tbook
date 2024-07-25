
import PostHeader from "@/shared/posts/postHeader";
import PostFooter from "@/shared/posts/postFooter";
import PostBtns from "@/shared/posts/postBtns";
import { PostUserType, UserType } from "@/lib/utils/types/user";
import PostContent from "./postContent";
import { PostType,FCommentType } from "@/lib/utils/types/post";
import {  useState } from "react";
import { RxCross2 } from "react-icons/rx";
import AddComment from "./footer/addComment";
import AllComments from "./footer/comment/allComment";
import { usePathname } from "next/navigation";
export default function PostTemplate({userInfo,user,post}:{
    userInfo:PostUserType;
    user:UserType | null;
    post:PostType
}) {
    const [show,setShow] = useState<boolean>(false)
    const [comment,setComment] = useState<FCommentType|null>(post.f_comment)
    const isLiked = post.likes.some((like) => like.user_id === user?.id)

    const pathname = usePathname()
    return (
        <>
            <div className="rounded-lg bg-white  sm-shadow">
                <div className="py-3">
                    <PostHeader 
                    userImage={userInfo.image}
                    userName={userInfo.name}
                    username={userInfo.username}
                    date={post.created_at}/>

                </div>
                <PostContent 
                content={post.content} 
                medias={post.medias}/>
                <div>

                </div>  
                <PostBtns 
                userId={user?.id} 
                isLiked={isLiked}
                postId={post.id}
                setShow={setShow}/>
                {pathname!=="/"&&user&&<div className="py-3">
                    <PostFooter user={user} 
                    postId={post.id}
                    comment={comment} 
                    setComment={setComment}
                    setShow={setShow}/>

                </div>}
            </div>
            {show&&<div className="fixed top-0 right-0 left-0 bottom-0 bg-white/60 z-50 no-doc-scroll pt-8 md:py-8">
                <div className="max-w-[700px]  w-full mx-auto bg-white h-full rounded-lg shadow-[0px_0px_7px_2px_rgba(0,0,0,0.3)]">
                    <div className="flex flex-col justify-between h-full">
                        <div className="relative py-4 border-b border-dark/30">
                            <h1 className="font-bold text-center text-xl capitalize flex items-center justify-center">{userInfo.name}'s Post</h1>
                            <div className="absolute text-2xl p-2 rounded-full bg-gray-300/60 cursor-pointer hover-opacity active:scale-90 right-3 bottom-3" onClick={() => setShow(false)}>
                                <RxCross2 />
                                
                            </div>
                        </div>
                        <div className=" py-3 flex-1 overflow-y-auto custom-scrollbar">
                            <PostHeader 
                            userImage={userInfo.image}
                            userName={userInfo.name}
                            username={userInfo.username}
                            date={post.created_at}/>
                            <PostContent 
                            content={post.content} 
                            medias={post.medias}/>
                            <PostBtns 
                            userId={user?.id} 
                            isLiked={isLiked}
                            postId={post.id}
                            setShow={setShow}/>
                            <AllComments 
                            postId={post.id} 
                            user={user as UserType}/>
                        </div>
                        
                        <div className=" py-2 pb-4 border-t border-dark/30">
                            {user&&
                            <AddComment 
                            userId={user.id}
                            userName={user.name}
                            userImage={user.image}
                            postId={post.id}
                            setComment={setComment}/>
            }
                        </div>
                    </div>
                </div>
                
            </div>}
        </>
    )
}