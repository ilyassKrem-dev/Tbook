import { ConvoType, MessageType } from "@/lib/utils/types/convo"
import { UserType } from "@/lib/utils/types/user"




export default function ConvoMessages({convo,user}:{
    convo:ConvoType,
    user:UserType,
    
}) {
    const {messages,other,id} = convo
    return (
        <div className="flex flex-col gap-2 p-2">
            {messages.map((message,index) => {
                const {id,sender,receiver,content,media} = message
        
                const data = sender === user.id ? user : other
                const isUser = sender === user.id
                return (
                    <div key={index+message.id} className={`flex gap-1 items-center ${isUser?"self-end":" self-start"}`}>
                        <div className={`rounded-full w-[28px] h-[28px] self-end ${isUser?"order-2":"order-1"}`}>
                            <img 
                            src={data.image ?? "/profile.jpg"}
                            alt={data.name + " image"}
                            className="w-full h-full rounded-full bg-white object-cover border" />
                        </div>
                        <div className={`text-base rounded-lg p-1 max-w-[200px]  ${isUser?"order-1 bg-blue-500  text-white":"order-2 bg-black/10 text-black"}`}>
                            {content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}