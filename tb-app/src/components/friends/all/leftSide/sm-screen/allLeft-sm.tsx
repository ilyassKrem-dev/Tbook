import { UserType, userFriendsType } from "@/lib/utils/types/user"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useRemoveOverlay } from "@/lib/utils/hooks"
import FriendList from "../shared/friendList"
import { LeftTopInfoSm } from "@/components/friends/shared/topLeftInfo"
export default function AllLeftSm({friends,setFriends,loggedInfo}:{
    friends:userFriendsType[];
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>;
    loggedInfo:UserType
}) {
    const [allFriends,setAllFriends] = useState<userFriendsType[]>(friends)
    
    const [show,setShow] = useState<boolean>(false)

    const [showMore,setShowMore] = useState<string>("")

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
        setAllFriends(friends.filter(friend => friend.friend.name.toLowerCase().startsWith(value)))
    }
    useRemoveOverlay({
        tab:'.all-tab',
        setShow
    })
    useEffect(() => {
        setAllFriends(friends)
    },[friends])
    return (
        <div className="flex flex-col gap-3 p-2 shadow-md request-nav all-tab">
                <LeftTopInfoSm setShow={setShow} show={show} tab="all"/>
                {show&&
                <div className={`flex flex-col max-h-[500px] h-fit  custom-scrollbar pb-16 overflow-y-auto ${showMore?"no-doc-scroll":""}`} onScroll={() => setShowMore("")}>
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
                
            </div>}

               
        </div>
    )
}