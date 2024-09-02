
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import AccountTab from "./account/accountTab";
import { UserType } from "@/lib/utils/types/user"
import Notifications from "./notifcations/notifications";
import Link from "next/link";
export default function UserActions({user,w}:{
    user:UserType;
    w:number
}) {

    return (
        <div className={`right-10 ${w>953 ?"absolute":"pr-3"}`}>
            <div className="flex gap-3 items-center relative">
                <div className="h-full rounded-full p-2 text-2xl bg-white-1 active:scale-90 hover:bg-gray-300 cursor-pointer">
                    <CgMenuGridR />
                </div>
                <Link href={"/messages"} className="h-full rounded-full p-2 text-2xl bg-white-1 active:scale-90 hover:bg-gray-300 cursor-pointer">
                    <BiSolidMessageRoundedDetail />
                </Link>
                {w>400&&
                <Notifications userId={user.id}/>}
                <AccountTab user={user}/>

            </div>
        </div>
    )
}