
import Stories from "@/components/stories/Stories"


export default function Page({params}:{
    params:{username:string}
}) {
    

    return (<Stories username={params.username}/>
    )
}