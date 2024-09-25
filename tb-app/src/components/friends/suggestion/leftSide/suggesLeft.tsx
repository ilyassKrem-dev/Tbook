
import { FaArrowLeft } from "react-icons/fa6"
import Link from "next/link"
import { SetStateAction, useState } from "react"
import LoadingAnimation from "@/shared/spinner"
import { UserType } from "@/lib/utils/types/user"
import { OtherType } from "@/lib/utils/types/friend"
import LeftTemplate from "../../shared/leftTemplate"
import { useRemoveOverlay, useSize } from "@/lib/utils/hooks"
import BurgerCross from "../../shared/burgerCross"
import { usePathname } from "next/navigation"
import axios from "axios"
import { LeftTopInfoLg, LeftTopInfoSm } from "../../shared/topLeftInfo"
export default function SuggestionLeft({loggedInfo,others,setOthers}:{
    loggedInfo:UserType;
    others:OtherType[];
    setOthers:React.Dispatch<SetStateAction<OtherType[]>>
}) {
    const [show,setShow] = useState<boolean>(false)
    const [loading,setLoading] = useState<number>(0)
    const handleConfrim = async(e:any,other_id:number) => {
        e.preventDefault()
        if(loading!==0) return
        setLoading(other_id)
        const res = await axios.post("/api/socket/add",{
            user:loggedInfo.id,
            friend:other_id
        })
        if(res.data) {
            setLoading(0)
            setOthers(prev => {
                return prev.filter(other => other.id !== other_id)
            })
            
        }
    }
    const handleRemove = async(e:any,other_id:number) => {
        e.preventDefault()
        setOthers(prev => (prev.filter(req=>req.id!==other_id)))
    }
    useRemoveOverlay({
        tab:".suggest-nav",
        setShow
    })
    const pathname = usePathname()
    const {w} = useSize()
    return (
        <LeftTemplate>
            {w>767&&<div className="flex flex-col gap-3 p-4 px-5">
                <LeftTopInfoLg tab="suggestion"/>
    
                <div className="flex flex-col overflow-y-scroll custom-scrollbar pb-10">
                    {others.map((req,index) => {
                        const {name,id,username,image} = req
                        const check = id === loading
                        return (
                            <Link href={`${pathname}?profile=${username}`} key={index} className="flex items-center gap-3 hover:bg-gray-300/30 p-2 rounded-md transition-all duration-300">
                                <div className="w-[60px] h-[60px] rounded-full">
                                    <img 
                                    src={image??"/profile.jpg"} 
                                    alt={`${name} profile img`}
                                    className="rounded-full w-full h-full object-cover bg-white border " />
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{name}</p>
                                        <p className="text-black/50 text-sm">1d</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <button className="bg-blue-600 text-white rounded-md p-1 py-[0.3rem] hover-opacity active:scale-95 flex-1" onClick={(e) => handleConfrim(e,id)}>
                                            {check?<LoadingAnimation/>:"Add friend"}
                                        </button>
                                        <button className="bg-gray-300/50 text-black rounded-md p-1 py-[0.3rem] hover-opacity active:scale-95 flex-1" onClick={(e) => handleRemove(e,id)}>Remove</button>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                    
                </div>
            </div>}
            {w<=767&&<div className="flex flex-col gap-3 p-2 shadow-md suggest-nav">
                <LeftTopInfoSm setShow={setShow} show={show} tab="suggestion"/>
                {show&&
                <div
                
                className="flex flex-col gap-3">
                    
                    <div className="flex flex-col overflow-y-scroll max-h-[500px] custom-scrollbar pb-10">
                        {others.map((req,index) => {
                            const {name,id,username,image} = req
                            const check = id === loading
                            return (
                                <Link href={`${pathname}?profile=${username}`} key={index} className="flex items-center gap-3 hover:bg-gray-300/30 p-2 rounded-md transition-all duration-300">
                                    <div className="w-[60px] h-[60px] rounded-full">
                                        <img 
                                        src={image??"/profile.jpg"} 
                                        alt={`${name} profile img`}
                                        className="rounded-full w-full h-full object-cover bg-white border " />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">{name}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <button className="bg-blue-600 text-white rounded-md p-1 py-[0.3rem] hover-opacity active:scale-95 flex-1" onClick={(e) => handleConfrim(e,id)}>
                                                {check?<LoadingAnimation/>:"Add friend"}
                                            </button>
                                            <button className="bg-gray-300/50 text-black rounded-md p-1 py-[0.3rem] hover-opacity active:scale-95 flex-1" onClick={(e) => handleRemove(e,id)}>Remove</button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        
                    </div>
    
                </div>}

               
            </div>}
        </LeftTemplate>
        
    )
}