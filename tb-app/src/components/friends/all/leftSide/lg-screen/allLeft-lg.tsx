import MoreOptions from "@/components/friends/all/assets/moreOptions"
import { UserType, userFriendsType } from "@/lib/utils/types/user"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { RxDotsHorizontal } from "react-icons/rx"
import { FiSearch } from "react-icons/fi";



export default function AllLeftLg({friends,loggedInfo,setFriends}:{
    friends:userFriendsType[]
    loggedInfo:UserType;
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>
}) {
    const [allFriends,setAllFriends] = useState<userFriendsType[]>([])
    const [hovered,setHoverd] = useState<string>("")
    const [showMore,setShowMore] = useState<string>("")
    const pathname = usePathname()
    const [dropdownPosition,setDropdownPosition] = useState({
        top:0,left:0
    })
    const handleShow = (e:any,id:string) => {
        e.preventDefault()
        if(id == showMore) return setShowMore("")
        setShowMore(id)
        setDropdownPosition({ 
            top: e.currentTarget.getBoundingClientRect().top, 
            left: e.currentTarget.getBoundingClientRect().right 
        })
    }
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
       
         
        setAllFriends(friends.filter(friend => friend.friend.name.toLowerCase().startsWith(value)))
    }
    useEffect(() => {
        if(!showMore) return
        const removeOv = (e:any) => {
            const overlay = document.querySelector(".more-options")
            if(overlay&&!overlay.contains(e.target)) {
                setShowMore("")
            }
        }
        document.addEventListener("click",removeOv)
        return () => document.removeEventListener("click",removeOv)
    },[showMore])

    useEffect(() => {
        setAllFriends(friends);
    }, [friends]);
    return (
        <div className="flex flex-col gap-3 p-4 px-5">
            <div className="flex items-center gap-4 border-b border-black/30">
                <Link href={"/friends/"} className="text-xl text-black/60 hover:bg-gray-300/60 p-2 transition-all duration-300 rounded-full active:scale-95">
                    <FaArrowLeft />
                </Link>
                <div>
                    <span className="text-black/50 text-sm">Friend</span>
                    <h1 className="text-2xl font-bold">All friends</h1>
                </div> 
            </div>

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
                {allFriends.map((fri,index) => {
                    const {friend} = fri
                    const {id,name,image,username} = friend
                    const check = id === showMore
                    return (
                        <Link
                        onMouseEnter={() =>setHoverd(fri.id)}
                        onMouseLeave={() => setHoverd("")}
                        href={`${pathname}?profile=${username}`} key={index} className={`flex items-center gap-3  p-2 rounded-md transition-all duration-300 ${hovered===fri.id?"hover:bg-gray-300/30":""} relative`}>
                            <div className="w-[60px] h-[60px] rounded-full">
                                <img 
                                src={image??"/profile.jpg"} 
                                alt={`${name} profile img`}
                                className="rounded-full w-full h-full object-cover bg-white border " />
                            </div>
                            <div className="flex flex-col gap-2 flex-1 ">
                                <div className="flex justify-between items-center relative more-options">
                                    <p className="font-semibold cursor-pointer">{name}</p>
                                    <div className="hover:bg-gray-300/70 rounded-full p-1 text-xl active:scale-95 transition-all duration-300" 
                                    onMouseEnter={() => setHoverd("")}
                                    onMouseLeave={() => setHoverd(fri.id)}
                                    onClick={(e) => handleShow(e,id)}>
                                        <RxDotsHorizontal />
                                        
                                    </div>
                                    {check&&
                                    <MoreOptions
                                    setShowMore={setShowMore}
                                    setFriends={setFriends}
                                    dropdownPosition={dropdownPosition}
                                    userFriend={fri}
                                    userId={loggedInfo.id}/>}
                                </div>
                        
                            </div>
                            
                        </Link>
                    )
                })}
                
            </div>
        </div>
    )

}