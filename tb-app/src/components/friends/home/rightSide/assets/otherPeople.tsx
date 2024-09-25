import { useToast } from "@/assets/Wrappers/toastWrapper";
import { FriendsReqType, OtherType } from "@/lib/utils/types/friend";
import { UserType } from "@/lib/utils/types/user";
import LoadingAnimation from "@/shared/spinner";
import axios from "axios";
import Link from "next/link";
import { SetStateAction, useState } from "react";



export default function OtherPeople({others,loggedInfo,setFriendsR}:{
    others:OtherType[];
    loggedInfo:UserType;
    setFriendsR:React.Dispatch<SetStateAction<FriendsReqType>>
}) {
    const [loading,setLoading] = useState<number>(0)
    const {toast} = useToast()
    const handleAddFriend = async(other_id:number) => {
        if(loading) return
        setLoading(other_id)
        try {
            const res = await axios.post("/api/socket/add",{
                user:loggedInfo.id,
                friend:other_id
            })
            if(res.data) {
                setLoading(0)
                setFriendsR(prev => {
                    const newData = prev.others.filter(oth=>oth.id!==other_id)
                    return {...prev,others:newData}
                })
                
            }
        } catch (error:any) {
            setLoading(0)
            toast({
                varient:"error",
                title:"Error",
                description:error.message
            })
        }
    }
    const handleRemove = (other_id:number) => {
        setFriendsR(prev => {
            const newData = prev.others.filter(oth=>oth.id!==other_id)
            return {...prev,others:newData}
        })
    }
    return (
        <section className="flex gap-3 flex-col pb-8 ">
            <div className="flex justify-between items-center">
                <h1 className=" text-xl md:text-2xl font-bold">Other people</h1>
                <Link href={"/friends/suggestion"} className="text-base md:text-lg text-blue-500 p-2 rounded-md hover:bg-gray-300/40 transition-all duration-300 active:scale-95">
                    See all
                </Link>
            </div>
            <div className="flex gap-5 flex-wrap items-center">
                {others.map((user,index) => {
                    const {id,image,name,country} = user
                    const check = user.id === loading
                    return (
                        <div  key={index} className="rounded-lg flex flex-col gap-1 bg-white border shadow-md border-black/20">
                            <Link href={`/friends/suggestion/?profile=${user.username}`} className="w-[150px] md:w-[201px] h-[150px] md:h-[201px] ">
                                <img 
                                src={image??"/profile.jpg"}
                                alt={name + " profile img"}
                                className="rounded-t-lg bg-white border w-full h-full object-cover" />
                            </Link>
                            <div className="p-2 px-3 flex gap-5 flex-col">
                                <Link href={`/friends/suggestion/?profile=${user.username}`} className="font-bold hover:underline transition-all duration-300">{user.name}</Link>
                                <div className="flex flex-col gap-2">
                                    <button className="bg-blue-100/60 text-blue-600 rounded-md p-1 py-2 hover-opacity active:scale-95 font-semibold" onClick={() => handleAddFriend(id)}>
                                        {check?<LoadingAnimation/>:"Add friend"}
                                    </button>
                                    <button className="bg-gray-300/50 text-black rounded-md p-1 py-2 hover-opacity active:scale-95" onClick={() => handleRemove(id)} >Remove</button>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </section>
    )
}