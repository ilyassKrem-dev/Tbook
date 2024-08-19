import BurgerCross from "@/components/friends/shared/burgerCross"
import { UserType, userFriendsType } from "@/lib/utils/types/user"
import Link from "next/link"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { RxDotsHorizontal } from "react-icons/rx"
import { usePathname } from "next/navigation"
import { FiSearch } from "react-icons/fi"
import MoreOptions from "@/components/friends/all/assets/moreOptions"
import { removeOverlay } from "@/lib/utils/hooks"


export default function AllLeftSm({friends,setFriends,loggedInfo}:{
    friends:userFriendsType[];
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>;
    loggedInfo:UserType
}) {
    const [allFriends,setAllFriends] = useState<userFriendsType[]>(friends)
    const [show,setShow] = useState<boolean>(false)
    const [hovered,setHoverd] = useState<string>("")
    const [dropdownPosition,setDropdownPosition] = useState({
        top:0,left:0
    })
    const [showMore,setShowMore] = useState<string>("")
    const pathname = usePathname()
    const handleShow = (e:any,id:string) => {
        e.preventDefault()
        if(id == showMore) return setShowMore("")
        setShowMore(id)
        setDropdownPosition({ 
            top: e.currentTarget.getBoundingClientRect().top, 
            left: e.currentTarget.getBoundingClientRect().left 
        })
    }
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
       
         
        setAllFriends(friends.filter(friend => friend.friend.name.toLowerCase().startsWith(value)))
    }
    removeOverlay({
        tab:'.all-tab',
        setShow
    })
    useEffect(() => {
        const removeOv = (e:any) => {
            const overlay = document.querySelector(".more-options")
            if(overlay&&!overlay.contains(e.target)) {
                setShowMore("")
            }
        }
        document.addEventListener("click",removeOv)
        return () => document.removeEventListener("click",removeOv)
    },[])
    useEffect(() => {
        setAllFriends(friends)
    },[friends])
    return (
        <div className="flex flex-col gap-3 p-2 shadow-md request-nav all-tab">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={"/friends/"} className="text-xl text-black/60 hover:bg-gray-300/60 p-2 transition-all duration-300 rounded-full active:scale-95">
                            <FaArrowLeft />
                        </Link>
                        <div className="flex items-center gap-1">
                            <h1 className="text-xl md:text-2xl font-bold">All friends</h1>
                            <span className="text-black/50 text-sm mt-1">/ Friend</span>
                        </div>

                    </div>
                    <BurgerCross setShow={setShow} show={show}/>
                </div>
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
                
            </div>}

               
        </div>
    )
}