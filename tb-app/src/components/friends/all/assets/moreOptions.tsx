import { userFriendsType } from "@/lib/utils/types/user";
import ReactDOM from "react-dom";
import { useConvo } from "@/assets/Wrappers/convoWrapper";
import { AiOutlineMessage } from "react-icons/ai";
import { LuUserX } from "react-icons/lu";
import { SetStateAction } from "react";
import Friend from "@/lib/classes/Friend";
import { useSize } from "@/lib/utils/hooks";

interface Props {
    dropdownPosition:{
        left:number;
        top:number;
    };
    userFriend:userFriendsType;
    userId:string;
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>;
    setShowMore:React.Dispatch<SetStateAction<string>>
}

export default function MoreOptions({dropdownPosition,userFriend,userId,setFriends,setShowMore}:Props) {
    const {friend} = userFriend
    const {username} = friend
    const {w} = useSize()
    const {handleClick} = useConvo()
    const handleMsg = () => {
        handleClick({user_id:userId,other_id:friend.id})
        setShowMore("")
    }
     
    const handleUnfriend = async() => {
        const res = await Friend.removeFriend(userId,friend.id,"")
        if(res?.success) {
            setFriends(prev => (prev.filter(friend => friend.id!==userFriend.id)))
            setShowMore("")
        }
    }
    const options = [
        {
            title:`Message ${username}`,
            desc:"",
            func:handleMsg,
            icon:<AiOutlineMessage />
        },
        {
            title:`Unfriend ${username}`,
            desc:`<span class=" capitalize">${username}<span> Remove ${username} as a friend`,
            func:handleUnfriend,
            icon:<LuUserX />
        }
    ]
    return (
        <>
            {w>767&&ReactDOM.createPortal(<div className={`absolute left-64 top-10 z-40`}
            style={{ top: dropdownPosition.top + 35, left: dropdownPosition.left -10 }}>
                <div className="w-[270px] p-1 bg-white rounded-md shadow-md">
                        <div className="flex flex-col gap-1">
                            {options.map((option,index) => {
                                return (
                                    <div key={index} className={`flex  gap-3 h-fit hover:bg-gray-300/30 rounded-md p-1 transition-all duration-300 cursor-pointer ${option.desc?"items-start":"items-center"}`} onClick={option.func}>
                                        <div className="text-3xl text-black/60">
                                            {option.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-base capitalize cursor-pointer">{option.title}</h1>
                                            <p className="text-[0.78rem] text-black/50 break-words cursor-pointer" dangerouslySetInnerHTML={{__html:option.desc}}/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>
            </div>,document.body)}
            {w<=767&&ReactDOM.createPortal(<div className={`absolute right-64 top-10 z-40`}
            style={{ top: dropdownPosition.top + 35, left: dropdownPosition.left -250 }}>
                <div className="w-[270px] p-1 bg-white rounded-md shadow-md">
                        <div className="flex flex-col gap-1">
                            {options.map((option,index) => {
                                return (
                                    <div key={index} className={`flex  gap-3 h-fit hover:bg-gray-300/30 rounded-md p-1 transition-all duration-300 cursor-pointer ${option.desc?"items-start":"items-center"}`} onClick={option.func}>
                                        <div className="text-3xl text-black/60">
                                            {option.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-base capitalize cursor-pointer">{option.title}</h1>
                                            <p className="text-[0.78rem] text-black/50 break-words cursor-pointer" dangerouslySetInnerHTML={{__html:option.desc}}/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>
            </div>,document.body)}
        </>
    )
}