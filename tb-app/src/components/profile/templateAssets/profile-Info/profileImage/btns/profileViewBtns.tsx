
import { AiFillMessage } from "react-icons/ai";
import FriendBtn from "./friendBtn";

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
   
    return (
        <>
            <div className="flex items-center gap-3 pb-6">
               <FriendBtn userId={userId} profileId={profileId}/>
                <button className="flex items-center gap-2 font-semibold bg-gray-300/60 rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]" >
                    <AiFillMessage  className="text-xl"/>
                    Message
                </button>
            </div>
        </>
    )
}