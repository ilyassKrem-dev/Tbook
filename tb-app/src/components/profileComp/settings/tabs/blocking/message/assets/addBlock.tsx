import { ChangeEvent, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import UserMisc from "@/lib/classes/User.misc/UserMisc";
import { UnblockedConvosType } from "@/lib/utils/types/user.misc/user.misc";
import LoadingAnimation from "@/shared/spinner";

export default function AddBlock() {
    const [convos,setConvos] = useState<UnblockedConvosType[]>([])
    const [input,setInput] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(true)
    const {user} = loginInfo()
    useEffect(() => {
        if(!user) return
        const getUnblockedConvos = async() => {
            const res = await new UserMisc(user.username).getconvoUsers(null)
            if(res?.success) {
                setConvos(res.data)
                setLoading(false)
            }
        }
        getUnblockedConvos()
    },[user])
    const handleSearch = async(e:ChangeEvent<HTMLInputElement>) => {
        if(!user) return
        setLoading(true)
        const value = e.target.value
        setInput(value)
        const res = await new UserMisc(user?.username).getconvoUsers(value)
        if(res?.success) {
            setConvos(res.data)
            setLoading(false)
        }
    }
    const handleBlock = async(convo_id:number) => {
        if(!user) return
        const res = await new UserMisc(user?.username).blockUser(convo_id)
        if(res?.success) {
            setConvos(prev => (prev.filter(convo => convo.id !== convo_id)))
        }
    }
    return (
        <div className="flex flex-col gap-5">
            <div className="relative flex justify-center items-center">
                <input type="text" name="convo_search" className="rounded-full h-[35px] bg-gray-1 focus-within:outline-none border-0 placeholder:text-sm px-8" placeholder="Type a name" onChange={handleSearch} />
                <div className="absolute left-2 text-lg text-black/70">
                    <IoSearch />
                </div>
            </div>
             

            <div className={`custom-scrollbar  max-h-[500px] flex-1 ${loading?"":"overflow-y-auto"}`}>
                {loading&&<LoadingAnimation />}
                {convos.length==0&&!loading&&!input&&
                <p className="font-semibold text-center w-full">No friend to block</p>}
                
                {convos.length===0&&input.length>0&&<p className="text-xs text-center text-black/70">No matches for "{input}" </p>}

                {convos.length>0&&!loading&&convos.map((conov,index) => {
                    const {other,id} = conov
                    return (
                        <div key={index} className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                <div className="w-[36px] h-[36px] rounded-full">
                                    <img 
                                    src={other.image??"/profile.jpg"} 
                                    alt={`${other.username} image`}
                                    className="w-full rounded-full h-full border bg-white  object-cover" />
                                </div>
                                <p className="font-semibold">{other.name}</p>
                            </div>
                            <button className="p-[0.35rem] px-3 bg-gray-500/20 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300 active:scale-95" onClick={() => handleBlock(id)}>Block</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}