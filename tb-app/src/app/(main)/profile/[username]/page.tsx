
import ProfileBy from "@/components/profile/profileByUsername/profileBy"

export default function Page({params}:{
    params:{username:string}
}) {

    return (
        <ProfileBy userName={params.username}/>
    )
}