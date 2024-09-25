import { SetStateAction, useState } from "react"
import Link from "next/link"
import { VscChromeMinimize } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { ConvoType } from "@/lib/utils/types/convo";
import { RiArrowDownSLine } from "react-icons/ri";
import OtherOptions from "./misc/otherOptions";
import { useRemoveOverlay } from "@/lib/utils/hooks";
import { UserType } from "@/lib/utils/types/user";
import { useDispatch } from "react-redux";
import { moveConvoToSide, removeConvo } from "../redux/convoRedux";
interface Props {
    mouseEntered:boolean;
    convo:ConvoType;

    user:UserType;
    dispatch:ReturnType<typeof useDispatch>
}

export default function ConvoHeader({mouseEntered,convo,user,dispatch}:Props) {
    const [hovered,setHovered] = useState<boolean>(false)
    const [show,setShow] = useState<boolean>(false)
    const {other} = convo
    const handleClose = (id:string) => {
        dispatch(removeConvo({id}))
    }
    useRemoveOverlay(
        {
            tab:`.other_options-${convo.id}`,
            setShow
        }
    )
    const handleMin = (convo:ConvoType) => {
        dispatch(moveConvoToSide(convo))
    }
    const handleShow = () => {
        if(hovered) return
        setShow(prev => !prev)
    }
    return (
        <div className="flex justify-between items-center p-1 border-b-2">
            <div className={`relative other_options other_options-${convo.id}`}>
                <div className={`flex items-center gap-1  rounded-lg pr-2 ${hovered?"":"hover:bg-gray-300/60 transition-all duration-300 cursor-pointer"}`} onClick={handleShow}>
                    <Link href={other.id.toString() === "100" ?"#" :`/profile/${other.username}`} className="hover:bg-gray-300/70 rounded-lg p-[0.4rem] transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>
                        <div className="w-[32px] h-[32px] rounded-full relative">
                            {other.id.toString() === "100" 
                            ?
                            <img 
                            src="/profileAi.jpg" 
                            alt={`image`}
                            className="rounded-full w-full h-full border bg-white object-cover" />
                            :
                            <img 
                            src={other.image ?? "/profile.jpg"} 
                            alt={`${other.name} image`}
                            className="w-full border bg-white object-cover h-full rounded-full" />}
                            {other.status=="online"&&
                            <div className="absolute bottom-[2px] right-[1px] bg-white rounded-full w-[10px] h-[10px] p-[0.1px] flex justify-center items-center">
                                <div className="bg-green-600 rounded-full w-[8px] h-[8px]" />
                                
                            </div>}
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
                    userId={user.id}
                    otherId={other.id}
                    />
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