import { SetStateAction, useState } from "react"
import Link from "next/link"
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { ConvoType } from "@/lib/utils/types/convo";

interface Props {
    mouseEntered:boolean;
    convo:ConvoType;
    setConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    setSideConvos:React.Dispatch<SetStateAction<ConvoType[]>>
}

export default function ConvoHeader({mouseEntered,convo,setConvos,setSideConvos}:Props) {
    const [hovered,setHovered] = useState<boolean>(false)
    const {other} = convo
    const handleClose = (id:string) => {
        return setConvos(prev => {
            return prev.filter(convo => convo.id !== id)
        })
    }
    const handleMin = (convo:ConvoType) => {
        const id = convo.id
        setConvos(prev => {
            return prev.filter(convo => convo.id !== id)
        })
        setSideConvos(prev => ([convo,...prev]))
    }
    return (
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
            <div className={`flex gap-2 items-center text-2xl   ${mouseEntered ? "text-blue-500":"text-black/30"}`}>
                <div className="hover:bg-gray-300/40 transition-all duration-300 rounded-full p-1 active:scale-95 cursor-pointer" onClick={() => handleMin(convo)}>
                    <VscChromeMinimize />
                </div>
                <div className="hover:bg-gray-300/40 transition-all duration-300 rounded-full p-1 active:scale-95 cursor-pointer" onClick={() => handleClose(convo.id)}>
                    <RxCross2 />
                </div>
            </div>
        </div>
    )
}