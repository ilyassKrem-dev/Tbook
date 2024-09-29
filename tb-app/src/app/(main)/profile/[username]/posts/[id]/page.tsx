
import ProfilePosts from "@/components/profile/posts/ProfilePosts"



export default function Page({params}:{
    params:{id:string}
}) {

    return (
        <ProfilePosts postId={params.id}/>
    )
}