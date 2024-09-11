import { useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa6"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import UserInfo from "@/lib/classes/User.misc/UserInfo"
import LoadingAnimation from "@/shared/spinner"
type PasswordsType = {
    old:string,
    newP:string,
    confirmP:string
}
export default function PasswordChange() {
    const router = useRouter()
    const {user} = loginInfo()
    const [loading,setLoading] = useState<boolean>(false)
    const [msg,setMsg] = useState<string>("")
    const [changed,setChanged] = useState<boolean>(false)
    const [passwords,setPasswords] = useState<PasswordsType>({
        old:"",newP:"",confirmP:""
    })
    const [errors,setErrors] = useState<PasswordsType>({
        old:"",newP:"",confirmP:""
    })
    const handleChange = async() => {
        if(!user) return
        setLoading(true)
        const {old,newP,confirmP} = passwords
        if(newP.length<6 || newP!==confirmP || old===newP) {
            setLoading(false)
        }
        if(newP.length<6) return setErrors({
            old:"",newP:"Password must be longer than 6 character",confirmP:""
        })
        if(newP!==confirmP) return setErrors({
            old:"",newP:"",confirmP:"Passwords dont match"
        })
        if(old===newP) return setErrors({
            newP:"New password should not be the same as the old one",old:"",confirmP:""
        })
        const res = await new UserInfo(user.username).changePassword(passwords)
        if(res?.success) {
            setLoading(false)
            setMsg("Password changed")
            setPasswords({
                old:"",newP:"",confirmP:""
            })
            setChanged(true)
        }
        if(res?.success == false) {
            setErrors(res.errors)
            setLoading(false)
        }

    }
    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setErrors(prev => (
            {
                ...prev,[name]:"" 
            }
        ))
        setPasswords(prev => (
            {
                ...prev,[name]:value
            }
        ))

    }
    const forDisabled = passwords.newP.length===0 || passwords.old.length===0 || passwords.confirmP.length===0
    useEffect(() => {
        if(!msg || msg.length===0) return
        const id = setTimeout(() => {
            setMsg("")
        },5000)

        return () => clearTimeout(id)
    },[msg,changed])
    return (
        <div className="flex justify-center items-center h-full flex-col gap-6">
             <Link href={"/"} className="flex flex-col gap-2 items-center max-w-[600px] lg:items-start">
                <h1 className="text-blue-600 font-bold text-6xl">Tbook</h1>
            </Link>
            <div className="bg-white max-w-[900px] rounded-lg p-1 min-w-[320px] sm:min-w-[500px] md:w-[700px]">
                <div className="p-2 relative flex items-center justify-center border-b">
                    <h1 className="font-bold text-lg">Password change</h1>
                    <Link href={"/profile/settings?tab=info"} className="absolute left-2 bg-gray-300/70 rounded-full p-1 text-xl active:scale-95 hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                        <FaArrowLeft />
                    </Link>
                </div>
                
                <div className=" p-4">
                    <div className="w-full max-w-full flex flex-col items-center justify-center gap-3">
                        <div className="flex flex-col gap-1 w-full max-w-[700px]">
                            <p className="font-semibold text-lg ">Old password</p>
                            <span className="text-sm font-semibold text-accent">{errors.old}</span>
                            <input 
                            type="password" 
                            name="old"
                            value={passwords.old} 
                            onChange={handleInput}
                            onChangeCapture={() => setErrors(prev => ({...prev,newP:""}))} 
                            className={`h-[40px] ${errors.old ?"border-accent" :""}`} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <p className="font-semibold text-lg ">New password</p>
                            <span className="text-sm font-semibold text-accent">{errors.newP}</span>
                            <input 
                            type="password" 
                            name="newP"
                            value={passwords.newP} 
                            onChange={handleInput} 
                            className={`h-[40px] ${errors.newP ?"border-accent" :""}`}
                            onChangeCapture={() => setErrors(prev => ({...prev,newP:""}))} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <p className="font-semibold text-lg ">Confirm password</p>
                            <span className="text-sm font-semibold text-accent">{errors.confirmP}</span>
                            <input 
                            type="password" 
                            name="confirmP"
                            value={passwords.confirmP}  
                            onChange={handleInput} 
                            className={`h-[40px] ${errors.confirmP ?"border-accent" :""}`}
                            onChangeCapture={() => setErrors(prev => ({...prev,confirmP:""}))} />
                        </div>

                    </div>
                </div>
                {msg.length>0&&<div className="font-semibold text-center my-1">
                    {msg}
                </div>}
                <div className="border-t p-2 justify-center items-center gap-3 flex">
                        {!changed&&<Link href={"/profile/settings?tab=info"} className="p-2 px-6 bg-gray-300/70 font-semibold text-base active:scale-95 rounded-md hover:bg-gray-300 transition-all duration-300">Cancel</Link>}
                        {changed&&<Link href={"/"} className="p-2 px-6 bg-gray-300/70 font-semibold text-base active:scale-95 rounded-md hover:bg-gray-300 transition-all duration-300">Home</Link>}
                        <button 
                        className="p-2 px-6 bg-blue-400 font-semibold text-base active:scale-95 rounded-md hover:bg-blue-600 transition-all duration-300 text-white disabled:bg-blue-100 disabled:hover:bg-blue-100 disabled:active:scale-100 min-w-[101px]" onClick={handleChange} disabled={forDisabled}>
                            {loading?<LoadingAnimation/>:"Change"}
                        </button>
                </div> 
            </div>
        </div>
    )
}