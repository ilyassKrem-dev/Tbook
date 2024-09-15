import { BsThreeDots } from "react-icons/bs"
import SharedBtn from "./sharedBtns"
import { SetStateAction, useEffect, useState } from "react"
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import Link from "next/link";




export default function InfoShow({icon,value,view,type,setValue,setEdit,userId,text,absentType,setMoreInfo,isLink}:{
    icon:any;
    value:string|null;
    view?:boolean;
    text:string;
    type:string;
    absentType:string;
    setValue:React.Dispatch<SetStateAction<string|null>>;
    setEdit:React.Dispatch<SetStateAction<boolean>>;
    userId:string;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>;
    isLink?:boolean

}) {
    const [showBtns,setShowBtns] = useState<boolean>(false)
    useEffect(() => {
        if(!showBtns) return
        const checkClick = (e:any) => {
            const overlay = document.querySelector(".workTab")
            if(overlay&&!overlay.contains(e.target)) {
                setShowBtns(false)
            }
        }
        document.addEventListener("click",checkClick)

        return () => document.removeEventListener("click",checkClick)
    },[showBtns])
    return (
        <div className="flex justify-between items-center w-full">
                {!isLink&&<div className="flex items-center gap-3">
                    <div className="text-3xl text-black/50">
                        {icon}
                    </div>
                    {value?
                    <p>{absentType} <span className="font-bold">{value}</span></p>
                    :
                    <p className="text-black/60 font-medium">No {text} to show</p>}
                    
                </div>}
                {isLink&&
                <div className="flex items-center gap-3">
                    <div className="text-3xl text-black/50">
                        {icon}
                    </div>
                    {value&&<Link href={value} target="_blank" className="font-medium underline text-blue-400 active:scale-95">{value}</Link>}
                    
                </div>}
                {!view&&<div className="relative flex flex-col gap-1 items-center justify-center workTab">
                    <div className="rounded-full text-xl bg-gray-300/60 p-2 hover:bg-gray-300 active:scale-95 cursor-pointer" onClick={() => setShowBtns(prev => !prev)}>
                        <BsThreeDots />
                    </div>
                    {showBtns&&
                    <SharedBtn 
                    setEdit={setEdit}
                    setShow={setShowBtns}
                    value={value}
                    text={text}
                    setValue={setValue}
                    type={type}
                    userId={userId}
                    setMoreInfo={setMoreInfo}
                    />}
                </div>}
            </div>
    )
}