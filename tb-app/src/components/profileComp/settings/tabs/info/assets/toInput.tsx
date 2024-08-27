import { ChangeEvent, SetStateAction, useCallback, useState } from "react";
import { RxCross2 } from "react-icons/rx";

import { useSession } from "next-auth/react";
import UserInfo from "@/lib/classes/User.misc/UserInfo";


export default function ToInput({value,placeHolder,setShow,type}:{
    value:string;
    placeHolder:string;
    type:"username"|"name"|"phone";
    setShow:React.Dispatch<SetStateAction<string>>
}) {
    const {data:session,update} = useSession()
    const [input,setInput] = useState<string>(value)
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInput(value)
    }
    const handleCancel = () => {
        setInput(value)
        setShow("")
    }
    const handleEdit = useCallback(async() => {
        if(!session) return
        if(value === input) return
        const res = await new UserInfo((session.user as any).username).changeName({
            name:type,
            value:input
        })
        if(res) {
            update({...session,user:{...session.user,[type]:input}})
            setInput("")
        }
    },[session,input,value,type,update,setInput])
    
    return (
        <>
            <div className="relative flex justify-center items-center">
                <input type="text" className="h-[35px] bg-black/5 focus-within:outline-none rounded-xl placeholder:text-sm w-full border-none pr-10" 
                name="name"
                onChange={handleChange} 
                placeholder={placeHolder} 
                value={input}/> 
                <div className="text-black left absolute right-2 hover:bg-black/10 active:scale-95 transition-all duration-300 p-1 text-xl rounded-full cursor-pointer" onClick={() => setInput("")}>
                    <RxCross2 />
                </div>
            </div>
            <div className="flex gap-2 font-bold">
                <button className="flex-1 bg-gray-500/20 rounded-lg p-1 hover-opacity" onClick={handleCancel}>Cancel</button>
                <button className="flex-1 bg-blue-500/70 text-white rounded-lg p-1 hover-opacity disabled:bg-black/70" disabled={input===value} onClick={handleEdit}>Edit</button>
            </div>
        </>
    )
}