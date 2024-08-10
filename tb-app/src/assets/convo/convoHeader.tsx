import { SetStateAction, useState } from "react"
import Link from "next/link"
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { ConvoType } from "@/lib/utils/types/convo";
import { RiArrowDownSLine } from "react-icons/ri";
import OtherOptions from "./misc/otherOptions";
import { removeOverlay } from "@/lib/utils/hooks";
import { UserType } from "@/lib/utils/types/user";
interface Props {
    mouseEntered:boolean;
    convo:ConvoType;
    setConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    setSideConvos:React.Dispatch<SetStateAction<ConvoType[]>>;
    user:UserType
}

export default function ConvoHeader({mouseEntered,convo,setConvos,setSideConvos,user}:Props) {
    const [hovered,setHovered] = useState<boolean>(false)
    const [show,setShow] = useState<boolean>(false)
    const {other} = convo
    const handleClose = (id:string) => {
        return setConvos(prev => {
            return prev.filter(convo => convo.id !== id)
        })
    }
    removeOverlay(
        {
            tab:".other_options",
            setShow
        }
    )
    const handleMin = (convo:ConvoType) => {
        const id = convo.id
        setConvos(prev => {
            return prev.filter(convo => convo.id !== id)
        })
        setSideConvos(prev => ([convo,...prev]))
    }
    const handleShow = () => {
        if(hovered) return
        setShow(prev => !prev)
    }
    return (
        <div className="flex justify-between items-center p-1 border-b-2">
            <div className="relative other_options">
                <div className={`flex items-center gap-1  rounded-lg pr-2 ${hovered?"":"hover:bg-gray-300/60 transition-all duration-300 cursor-pointer"}`} onClick={handleShow}>
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
                        <div className="text-lg">
                            <RiArrowDownSLine />
                        </div>
                        
                        
                    </div>
                </div>
                <OtherOptions 
                    show={show}
                    setShow={setShow}
                    status={convo.status === "block"}
                    statusBy={convo.status_by}
                    convoId={convo.id}
                    userId={user.id}/>
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