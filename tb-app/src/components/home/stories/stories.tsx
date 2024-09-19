import { UserType } from "@/lib/utils/types/user"
import Link from "next/link"
import { FaPlus } from "react-icons/fa6"



export default function Stories({userDetails}:{
    userDetails:UserType
}) {


    return (
        <>
            <>
                {userDetails.image&&
                <Link href={"/stories/create"} className="h-full rounded-xl flex flex-col max-w-[150px] bg-white hover:bg-black/70 transition-all duration-300 active:scale-95 cursor-pointer group shadow-[0px_0px_5px_1px_rgba(0,0,0,0.4)] ">
                    <div className="flex-1 rounded-t-xl overflow-hidden">
                        <img 
                        src={userDetails.image ?? "/profile.jpg"} 
                        alt={`${userDetails.name} iamge`} 
                        className="w-full h-full object-cover bg-white rounded-t-xl group-hover:opacity-70 group-hover:scale-105 transition-all duration-300"/>
                    </div>
                    
                    <div className="relative flex items-center justify-center h-[50px] bg-white rounded-b-xl group-hover:opacity-80">
                            <p  className="mt-3 font-medium text-sm cursor-pointer">Create story</p>
                            <div className="absolute rounded-full bg-white p-1 text-lg bottom-7 group-hover:opacity-80 transition-all duration-300">
                                <div className="bg-blue-600 text-white text-xl rounded-full p-2">
                                    <FaPlus />
                                </div>
                                
                            </div>
                    </div>
                </Link> }
                {!userDetails.image&&
                <Link href={"/stories/create"} className="h-full rounded-xl flex flex-col max-w-[150px]  bg-white group shadow-[0px_0px_5px_1px_rgba(0,0,0,0.4)] hover:bg-black/70 transition-all duration-300 cursor-pointer">
                    <div className="relative flex items-center justify-center flex-col h-full bg-white rounded-xl group-hover:opacity-80">
                            <div className="rounded-full bg-white p-1 text-lg bottom-7">
                                <div className="bg-blue-600 text-white text-xl rounded-full p-2">
                                    <FaPlus />
                                </div>
                                
                            </div>
                            <p  className="mt-1 font-semibold text-sm cursor-pointer">Create story</p>
                            
                    </div>
                </Link>}
            
            </>
        
        </>
    )
}