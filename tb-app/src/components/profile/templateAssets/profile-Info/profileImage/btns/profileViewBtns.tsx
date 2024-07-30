
import { AiFillMessage } from "react-icons/ai";
import FriendBtn from "./friendBtn";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";

interface Props {
    profileId:string;
    isFriends:boolean;
    userId:string;
}

export default function ProfileViewBtns({
    profileId,
    isFriends,
    userId,
}:Props) {
    const [friends,setFriends] = useState<boolean>(isFriends)
    return (
        <>
            <div className="flex items-center gap-3 pb-6">
               {!friends
               ?
               <FriendBtn userId={userId} profileId={profileId} setFriends={setFriends}/>
               :
               <button className="flex items-center gap-2 font-semibold bg-gray-300/60 rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]" >
                    <FaUserFriends  className="text-xl"/>
                    Friends
                </button>}
                <button className="flex items-center gap-2 font-semibold bg-gray-300/60 rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]" >
                    <AiFillMessage  className="text-xl"/>
                    Message
                </button>
            </div>
        </>
    )
}