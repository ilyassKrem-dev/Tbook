"use client"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { useLoginInfoType } from "@/lib/utils/types/auth"
import Auth from "@/lib/classes/Auth"
import { signIn } from "next-auth/react"
import { useToast } from "@/assets/Wrappers/toastWrapper"
import CreateAccount from "@/shared/createAcc"
import { usePathname } from "next/navigation"
export default function Login() {
    const [show,setShow] = useState<boolean>(false)
    const [info,setInfo] = useState<useLoginInfoType>(
        {
            email:"",password:""
        }
    )
    const [errors,setErrors] = useState(
        {
            email:"",password:""
        }
    )
    const [loading,setLoading] = useState<boolean>(false)
    const {toast} = useToast()
    const pathname = usePathname()
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setErrors(prev => ({...prev,[name]:""}))
        setInfo(prev=>({...prev,[name]:value}))
    }
    const handleSubmit = async(e:FormEvent) => {
        if(loading) return
        setLoading(true)
        e.preventDefault()
        const res = await Auth.login(info)
        setLoading(false)
        if(res?.success) {
            return await signIn("credentials",{email:res.email,callbackUrl:"/"})
        }
        if(res?.success == null) {
            return toast({
                varient:"error",
                title:"Error",
                description:res?.errors as string
            })
        }
        if(res.success == false) {
            return setErrors(res.errors as any)
        }
    }
    return (
        <div className="bg-white p-4 rounded-xl flex flex-col items-center gap-5">
            
            <p className="text-lg font-semibold">Log in to Tbook</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 border-b pb-4">
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    
                    <input 
                    onChange={handleChange}
                    name="email"
                    value={info.email} 
                    type="email"
                    autoComplete="true" 
                    placeholder="Email address"
                    className={`${errors.email ?"border-accent border":""}`}/>
                    <p className="break-words text-accent text-sm">{errors.email}</p>
                </div>
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <input
                    name="password"
                    value={info.password} 
                    onChange={handleChange} 
                    type="password" 
                    placeholder="Password"
                    className={`${errors.password ?"border-accent border":""}`}/>
                    <p className="break-words text-accent text-sm">{errors.password}</p>
                </div>
                <Link href={"/auth/recovery"} className="text-sm text-blue-500 cursor-pointer hover-opacity">Forgot password ?</Link>
                <button 
                type="submit" 
                className={` rounded-lg w-full h-full text-white p-3 text-md  hover-opacity ${loading ?"bg-blue-200":"bg-blue-500"}`}
                disabled={loading}>
                    Login
                </button>
                
            </form>
            {pathname !== "/auth/login"
            ?
            <button onClick={() => setShow(true)} className="h-full w-full bg-green-1 text-md text-white rounded-lg text-center p-3 hover-opacity">
                Create account
            </button>
            :
            <Link href={"/auth/signin"} className="h-full w-full bg-green-1 text-md text-white rounded-lg text-center p-3 hover-opacity">
                Create account
            </Link>}
            {show&&<CreateAccount setShow={setShow}/>}
        </div>
    )
}