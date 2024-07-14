import { IoIosNotifications } from "react-icons/io";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import AccountTab from "./account/accountTab";
import { UserType } from "@/lib/utils/types/user"


export default function UserActions({user,w}:{
    user:UserType;
    w:number
}) {

    return (
        <div className={`right-10 ${w>953 ?"absolute":"pr-3"}`}>
            <div className="flex gap-3 items-center">
                <div className="h-full rounded-full p-2 text-2xl bg-white-1 active:scale-90 hover:bg-gray-300 cursor-pointer">
                    <CgMenuGridR />
                </div>
                <div className="h-full rounded-full p-2 text-2xl bg-white-1 active:scale-90 hover:bg-gray-300 cursor-pointer">
                    <BiSolidMessageRoundedDetail />
                </div>
                {w>400&&<div className="h-full rounded-full p-2 text-2xl bg-white-1 active:scale-90 hover:bg-gray-300 cursor-pointer">
                    <IoIosNotifications />
                </div>}
                <AccountTab user={user}/>

            </div>
        </div>
    )
}