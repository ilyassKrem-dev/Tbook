import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper";

import AllConvos from "./allConvos";


export default function LeftSideMessages() {
    const {user} = useLoginInfo()
    return (
        <div className="bg-white md:w-[400px] fixed top-14 left-0 bottom-0 right-0 py-1 z-40">
            <div className="p-3 flex flex-col h-full">
                <div className="border-b py-2">
                    <h1 className="font-bold text-xl">Messages</h1>
                </div>
                {user&&<>
                    <AllConvos  user={user}/>
                    <div className=" flex items-center border-t pt-2 gap-2">
                        <div className="w-[40px] h-[40px] rounded-full relative cursor-pointer group/msg-image hover:bg-black/50 transition-all duration-300 active:scale-95">
                            <img 
                            src={user.image ?? "/profile.jpg"} 
                            alt={user.name + " image"}
                            className="rounded-full w-full h-full object-cover bg-white border group-hover/msg-image:opacity-70 duration-300 transition-all " />
                            <div className="absolute bottom-0 right-0">
                                <div className={`rounded-full p-[0.35rem] ${user.status==="online"?"bg-green-600":""} group-hover/msg-image:bg-opacity-90`} 
                                />

                            </div>
                        </div>
                        <p className="font-semibold capitalize">{user.name}</p>
                    </div>
                
                </>}
            </div>
        </div>
    )
}