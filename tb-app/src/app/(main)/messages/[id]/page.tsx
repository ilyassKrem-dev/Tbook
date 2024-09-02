
import MessagesId from "@/components/messages/id/messagesId"
import TopNav from "@/shared/navTop/topNav"



export default function Page({params}:{
    params:{id:string}
}) {
    const convo_id = params.id
    return (
        <>
            <TopNav />
            <MessagesId  convo_id={convo_id}/>
        </>
        
    )
}