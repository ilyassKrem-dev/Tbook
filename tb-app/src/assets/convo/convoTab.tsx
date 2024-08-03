import { ConvoType } from "@/lib/utils/types/convo"
import { UserType } from "@/lib/utils/types/user";
import { SetStateAction, useState } from "react"
import { RxCross2 } from "react-icons/rx";
import { VscChromeMinimize } from "react-icons/vsc";
import Link from "next/link";



export default function ConvoTab({convos,setConvos,user}:{
    convos:ConvoType[],
    setConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    user:UserType
}) {
    const [hovered,setHovered] = useState<boolean>(false)
    const [mouseEntered,setMouseEntered] = useState<boolean>(false)
    return (
        <>
            <div className="fixed bottom-0 right-20">
                <div className="flex gap-5">
                    {convos.map((convo,index) => {
                        const {messages,other} = convo
                        return (
                            <>
                                <div key={convo.id+index}>
                                    <div className="bg-white h-[450px] rounded-t-lg w-[350px] shadow-xl">
                                        <div className="flex justify-between items-center p-1 border-b-2">
                                            <div className={`flex items-center gap-1  rounded-lg pr-2 ${hovered?"":"hover:bg-gray-300/60 transition-all duration-300 cursor-pointer"}`}>
                                                <Link href={`/profile/${other.username}`} className="hover:bg-gray-300/70 rounded-lg p-[0.4rem] transition-all duration-300 cursor-pointer"
                                                onMouseEnter={() => setHovered(true)}
                                                onMouseLeave={() => setHovered(false)}>
                                                    <div className="w-[32px] h-[32px] rounded-full">
                                                        <img 
                                                        src={other.image ?? "/profile.jpg"} 
                                                        alt={`${other.name} image`}
                                                        className="w-full border bg-white object-cover h-full rounded-full" />
                                                    </div>

                                                </Link>
                                                <div className="relative flex items-center gap-1 font-semibold">
                                                    {other.name}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 items-center text-2xl text-black/30 text-blue-500">
                                                <div className="hover:bg-gray-300/40 transition-all duration-300 rounded-full p-1 active:scale-95 cursor-pointer">
                                                    <VscChromeMinimize />
                                                </div>
                                                <div className="hover:bg-gray-300/40 transition-all duration-300 rounded-full p-1 active:scale-95 cursor-pointer">
                                                    <RxCross2 />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>
            </div>
        </>
    )
}