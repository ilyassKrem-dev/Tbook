import UserInfo from "@/lib/classes/User.misc/UserInfo";
import { UserType } from "@/lib/utils/types/user";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import LoadingAnimation from "@/shared/spinner"
import { AnimatePresence, motion } from "framer-motion"
import { SetStateAction, useState } from "react"




export default function InfoEdit({setEdit,user,setValue,value,type,text,setMoreInfo}:{
    setEdit:React.Dispatch<SetStateAction<boolean>>;
    user:UserType|null;
    setValue:React.Dispatch<SetStateAction<string|null>>;
    value:string|null;
    type:string;
    text:string;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>

}) {
    const [input,setInput] = useState<string>(value ?? "")
    const [clicked,setClicked] = useState<boolean>(input ? true : false)
    const [loading,setLoading] = useState<boolean>(false)
    const handleSaveOrAdd = async() => {
        if(!user || input.length<0) return setEdit(false)
        setLoading(true)
        const res = await UserInfo.updateInfo(user.id,input,type)
        if(res?.success) {
            setValue(input)
            setEdit(false)
            setLoading(false)
            setMoreInfo((prev:any)=>({...prev,[type]:input}))
        }
        if(!res?.success) {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center relative border-b pb-6">
                        <input type="text" className={`w-full h-[70px] rounded-md border-black/40 focus-within:outline-blue-400 $  ${clicked?"!pt-8":""}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        name="work" 
                        onFocus={() => setClicked(true)} onBlur={
                            () => {
                                if(!input) {
                                    setClicked(false)
                                }
                            }} />
                        <AnimatePresence>
                            {clicked&&<motion.span
                            initial={{y:0,fontSize:"16px",color:"rgb(0,0,0,0.7)"}}
                            animate={{y:-10,fontSize:"12px",color:"#60a5fa"}}
                            exit={{y:0,fontSize:"16px",color:"rgb(0,0,0,0.7)"}} 
                            className="absolute left-4 text-black/70 font-medium capitalize">{text}</motion.span>}
                            {!clicked&&<span
                            className="absolute left-4 text-black/70 font-medium text-base">{text}</span>}
                        </AnimatePresence>
                        
                </div>
                <div className="flex items-center justify-end gap-3">
                    <button className="bg-gray-300/70 text-black rounded-md px-3 py-2 font-medium active:scale-95 hover:bg-gray-300 transition-all duration-300" 
                    onClick={() => {
                        setEdit(false)
                        setInput("")
                    }}>
                        Cancel
                        </button>
                    <button className="bg-blue-500 text-white rounded-md px-3 py-2 font-medium active:scale-95 hover:bg-blue-600 transition-all duration-300" onClick={handleSaveOrAdd}>
                        {loading?
                        <LoadingAnimation/>
                        :
                        <>
                            {value?"Edit":"Add"}
                        </>}
                    </button>
                </div>
            </div>
    )
}