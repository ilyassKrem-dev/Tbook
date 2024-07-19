import { FullUserType, UserType } from "@/lib/utils/types/user"
import { ChangeEvent, useEffect, useState } from "react"
import User from "@/lib/classes/User"
import { useToast } from "@/assets/Wrappers/toastWrapper"
import { BiMessageAltDetail } from "react-icons/bi";


export default function Intro({userInfo,user}:{
    userInfo:FullUserType;
    user?:UserType | null
}) {
    const [userBio,setUserBio] = useState<string|null>(userInfo.bio)
    const [showBio,setShowBio] = useState<boolean>(false)
    const [words,setWords] = useState<string>(userBio || "")
    const [count,setCount] = useState<number>(101)
    const {toast} = useToast()
    const isUser = user?.id === userInfo.id
    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        if(!isUser) return
        const lastKeyPressed =( e.nativeEvent as any).inputType;
        if(!count && lastKeyPressed !== "deleteContentBackward") return
        setWords(e.target.value)
        
    }
    useEffect(() => {
        setCount(101-words.length)
    },[words])

    const handleAddBio = async() => {
        if(!words || !isUser) return
        const res = await new User(userInfo.id).addBio(userInfo.id,words)
        if(res?.success) {
            setUserBio(words)
            setShowBio(false)
        }
        if(res?.success == null) {
            return toast({
                varient:"error",
                title:"Error",
                description:res?.error as string
            })
        }
        if(!res?.success) {
            return toast({
                varient:"error",
                title:"Error",
                description:res.error
            })
        }
    }
    return (
        <div className="bg-white rounded-lg p-3 font-bold flex-col gap-5 flex sm-shadow">
            <h1 className="text-lg font-bold">Intro</h1>
            {!userBio&&isUser?
            <>
                {!showBio&&<button className=" font-semibold text-center p-2 rounded-lg bg-gray-300/60 w-full hover-opacity active:scale-90" onClick={() => setShowBio(true)}>
                    Add bio
                </button>}
            </>
            :
            <>
                {!showBio&&<div className="">
                    <div className="flex gap-1 items-start">
                        <div className="w-[30px]">
                            <BiMessageAltDetail className="text-2xl "/>

                        </div>
                        <div className="break-words max-h-[90px] overflow-y-auto">
                            <p className=" font-medium text-base ">{userBio}</p>
                        </div>
                        

                    </div>
                    {isUser&&<div className="flex justify-end">
                        <button className="bg-gray-300/60 p-2 rounded-md px-3 hover-opacity active:scale-90 z w-[80px]" onClick={() => setShowBio(true)}>Edit</button>
                    </div>}
                </div>}
            </>
            }
            {showBio&&isUser&&<div>
                <div className="h-[90px] border rounded-lg">
                        <textarea 
                        name="bio" 
                        id="bio"
                        value={words}
                        onChange={handleChange} 
                        className=" text-center resize-none w-full h-full focus-within:bg-white bg-gray-300/60 rounded-lg text-black placeholder:text-black/50 placeholder:focus-within:text-gray-500/40 pt-2  focus-within:border focus-within:outline-none focus-within:border-blue-400 font-medium px-2" placeholder="Describe who you are">
                            {userBio?userBio:""}
                        </textarea>
                        
                </div>
                <p className="text-sm font-medium text-black/60 mt-1 text-end">{count} characters remaining</p>
                <div className="flex gap-2 justify-end items-center font-medium text-sm">
                    <button className="bg-gray-300/60 p-2 rounded-md px-3 hover-opacity active:scale-90 z w-[80px]" onClick={() => {
                        setWords(userBio||"")
                        setShowBio(false)
                    }}>Cancel</button>
                    <button className="bg-blue-500 p-2 rounded-md text-white px-3 hover-opacity active:scale-90 z w-[80px] disabled:bg-gray-300/50 disabled:text-black/40" onClick={handleAddBio} disabled={!words}>Save</button>
                </div>
            </div>}
        </div>
    )
}