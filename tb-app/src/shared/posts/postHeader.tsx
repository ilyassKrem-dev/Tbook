import { getStringDate } from "@/lib/utils/simpleUtils";
import Link from "next/link";



export default function PostHeader({userImage,userName,date,username}:{
    userImage:string|null;
    userName:string;
    username:string;
    date:string
}) {
    const {day,month,year} = getStringDate(date)
    return (
        <>
            <div className="flex gap-3  items-center px-4">
                <Link href={`/profile/${userName}`} className="w-[40px] h-[40px] rounded-full">
                    <img 
                    src={userImage ? userImage: "/profile.jpg"} 
                    alt={`${userName} image`}
                    className="rounded-full w-full h-full object-cover" />
                </Link>
                <div className="flex flex-col">
                    <Link href={`/profile/${userName}`} className="font-semibold capitalize text-base hover:underline transition-all duration-300">{userName}</Link>
                    <div className="text-xs text-gray-500/70 flex items-center">
                        {month} {day}, {year}
                    </div>
                </div> 
            </div>
        </>
    )
}