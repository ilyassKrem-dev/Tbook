import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper"
import UserMisc from "@/lib/classes/User.misc/UserMisc"
import { UnblockedConvosType } from "@/lib/utils/types/user.misc/user.misc"
import { useEffect, useState } from "react"
import BlockedSearch from "./searchShow/blockedSearch";
import LoadingAnimation from "@/shared/spinner";
export default function ShowBlocked() {
    const {user} = useLoginInfo()
    const [blocked,setBlocked] = useState<UnblockedConvosType[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    useEffect(() => {
        if(!user) return
        const getBlockedConvos = async() => {
            const res = await new UserMisc(user.username).getBlockedconvoUsers(null)
            if(res?.success) {
                setBlocked(res.data)
                setLoading(false)
            }
        }
        getBlockedConvos()
    },[user])
    const handleUnblock = async(id:number) => {
        if(!user) return
        const res = await new UserMisc(user.username).blockUser(id,"unblock")
        if(res?.success) {
            setBlocked(prev => (prev.filter(con => con.id!==id)))
        }
    }
    return (
        <div className="mt-2">
            {user&&<BlockedSearch 
            setBlocked={setBlocked} 
            user={user} 
            setLoading={setLoading}
            loading={loading}
            blocked={blocked.length}/>}
            {loading&&<div className="flex items-center justify-center"><LoadingAnimation/></div>}
            
            <div className="flex flex-col max-h-[250px] overflow-y-auto custom-scrollbar gap-3 mt-2">
                
                {blocked.map((convo,index) => {
                    const {other} = convo
                    return (
                        <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-[36px] h-[36px] rounded-full">
                                    <img 
                                    src={other.image??"/profile.jpg"} 
                                    alt={`${other.name} image`}
                                    className="w-full h-full object-cover rounded-full border bg-white" />
                                </div>
                                <p className="font-semibold text-lg">{other.name}</p>
                            </div>
                            <button className="px-3 p-[0.4rem] rounded-md bg-gray-300 hover:bg-gray-400/80 transition-all duration-300 font-semibold active:scale-95" onClick={() => handleUnblock(convo.id)}>Unblock</button>
                        </div>
                    )
                })}
            </div>
           
        </div>
    )
}