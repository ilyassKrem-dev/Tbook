import { userFriendsType } from "@/lib/utils/types/user"
import { useConvo } from "@/assets/Wrappers/convoWrapper"


export default function ContactFrame({userInfo,userId}:{
    userInfo:userFriendsType,
    userId:string
}) {
    const {handleClick} = useConvo()
    const {friend} = userInfo
    return (
        <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-300/40 rounded-lg transition-all duration-300" onClick={() => handleClick({
            user_id:userId,
            other_id:friend.id
            })}>
            <div className="w-[36px] h-[36px] relative">
                <img 
                src={friend.image ?? "/profile.jpg"} 
                alt={`${friend.name} image`}
                className="rounded-full w-full h-full border bg-white object-cover" />
            </div>
            <p className=" font-semibold text-base cursor-pointer">{friend.name}</p>
        </div>
    )
}