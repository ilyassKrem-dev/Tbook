
import { UserType, userFriendsType } from "@/lib/utils/types/user"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi";
import FriendList from "../shared/friendList"
import { LeftTopInfoLg } from "@/components/friends/shared/topLeftInfo";

export default function AllLeftLg({friends,loggedInfo,setFriends}:{
    friends:userFriendsType[]
    loggedInfo:UserType;
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>
}) {
    const [allFriends,setAllFriends] = useState<userFriendsType[]>([])
    const [showMore,setShowMore] = useState<string>("")
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
        setAllFriends(friends.filter(friend => friend.friend.name.toLowerCase().startsWith(value)))
    }

    useEffect(() => {
        setAllFriends(friends);
    }, [friends]);
    return (
        <div className="flex flex-col gap-3 p-4 px-5">
            <LeftTopInfoLg  tab="all"/>

            <div className={`flex flex-col h-screen  custom-scrollbar pb-16 overflow-y-auto ${showMore?"no-doc-scroll":""}`} onScroll={() => setShowMore("")}>
                <div className="relative flex items-center justify-center pb-3 border-b border-black/30">
                    <input type="text" name="searchFre" id="searchFre" placeholder="Search friends" className="h-[40px] rounded-full text-sm placeholder:text-sm focus-within:outline-none bg-gray-300/20 pl-9 border-none font-normal" onChange={handleSearch} />
                    <div className="absolute left-2 text-xl">
                        <FiSearch />
                    </div>
                </div>
                {friends.length>0&&
                <div className="text-lg font-semibold self-start my-2">
                    <p>{friends.length} friend{friends.length==1?"":"s"}</p>
                </div>}
                <FriendList 
                allFriends={allFriends}
                userId={loggedInfo.id}
                showMore={showMore}
                setShowMore={setShowMore}
                setFriends={setFriends}/>
                
            </div>
        </div>
    )

}