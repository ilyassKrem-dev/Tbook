import { userFriendsType } from "@/lib/utils/types/user"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SetStateAction, useEffect, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import MoreOptions from "../../assets/moreOptions";

interface Props {
    allFriends:userFriendsType[];
    showMore:string
    setShowMore:React.Dispatch<SetStateAction<string>>;
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>;
    userId:string
}

export default function FriendList({allFriends,showMore,setShowMore,setFriends,userId}:Props) {
    const [hovered,setHoverd] = useState<string>("")
    const [dropdownPosition,setDropdownPosition] = useState({
        top:0,left:0
    })
    const pathname = usePathname()
    
    const handleShow = (e:any,id:string) => {
        e.preventDefault()
        if(id == showMore) return setShowMore("")
        setShowMore(id)
        setDropdownPosition({ 
            top: e.currentTarget.getBoundingClientRect().top, 
            left: e.currentTarget.getBoundingClientRect().right 
        })
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
    },[showMore,setShowMore])
    
    return (
        <>
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
                                userId={userId}/>}
                            </div>
                    
                        </div>
                        
                    </Link>
                )
            })}
        </>
    )
}