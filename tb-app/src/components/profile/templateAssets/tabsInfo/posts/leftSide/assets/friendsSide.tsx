import { usePathname } from "next/navigation"
import Link from "next/link"
import { userFriendsType } from "@/lib/utils/types/user"

export default function FriendsSide({friends}:{
    friends:userFriendsType[]
}) {
    const pathname = usePathname()
 
    return (
        <>
            <div className="bg-white rounded-lg p-3 font-bold flex-col gap-4  flex sm-shadow">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl">Friends</h1>
                        <Link href={`${pathname}?sk=friends`} className=" text-blue-400  hover-opacity font-normal text-lg hover:underline p-1 hover:bg-gray-300/30 rounded-md">
                            See all friends
                        </Link>
                    </div>
                    {friends.length>0&&<p className="text-black/60 font-normal text-lg">
                        {friends.length} {friends.length === 1 ? "friend":"friends"}
                    </p>}

                </div>
                <div className="flex flex-wrap gap-3">
                    {friends.map((fri,index) => {
                        const {friend} = fri
                        return (
                            <div  key={fri.id + index} className="flex flex-col gap-1">
                                <Link href={`/profile/${friend.username}`} className="md:max-w-[145px] md:max-h-[145px] rounded-xl hover:bg-black/20 group transition-all duration-300 max-w-[110px] max-h-[110px] sm:max-h-[130px] sm:max-w-[130px]">
                                    <img 
                                    src={friend.image ? friend.image : "/profile.jpg"} 
                                    alt={`${friend.name} picture`}
                                    className="rounded-xl w-full h-full object-cover group-hover:opacity-70 transition-all duration-300" />

                                </Link>
                                <Link href={`/profile/${friend.username}`} className="text-sm font-semibold ml-1 hover:underline transition-all duration-300">{friend.name}</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}