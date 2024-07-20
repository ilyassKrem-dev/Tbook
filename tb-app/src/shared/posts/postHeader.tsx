import { getStringDate } from "@/lib/utils/simpleUtils";




export default function PostHeader({userImage,userName,date}:{
    userImage:string|null;
    userName:string;
    date:string
}) {
    const {day,month,year} = getStringDate(date)
    return (
        <>
            <div className="flex gap-3  items-center px-4">
                <div className="w-[40px] h-[40px] rounded-full">
                    <img 
                    src={userImage ? userImage: "/profile.jpg"} 
                    alt={`${userName} image`}
                    className="rounded-full w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold capitalize text-base">{userName}</h2>
                    <div className="text-xs text-gray-500/70 flex items-center">
                        {month} {day}, {year}
                    </div>
                </div> 
            </div>
        </>
    )
}