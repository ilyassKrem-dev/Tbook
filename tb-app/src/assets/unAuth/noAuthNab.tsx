
import Auth from "@/lib/classes/Auth"
import { useSize } from "@/lib/utils/hooks"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { useToast } from "../Wrappers/toastWrapper"
export default function NoAuthNav() {
    const [loading,setLoading] = useState<boolean>(false)
    const [info,setInfo] = useState({
        email:"",password:""
    })
    const [errors,setErrors] = useState(
        {
            email:"",password:""
        }
    )
    const {toast} = useToast()
    const {w} = useSize()
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setInfo(prev => ({...prev,[name]:value}))
    }
    const handleLogin = async(e:FormEvent) => {
        if(loading) return
        setLoading(true)
        e.preventDefault()
        const res = await Auth.login(info)
        setLoading(false)
        if(res?.success) {
            return await signIn("credentials",{email:res.email})
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
        <>
            {w>=640&&<div className="fixed top-0 right-0 left-0 z-50 bg-white shadow-[-1px_4px_3px_1px_rgba(232,229,229,1)] hidden sm:block">
                    <div className="flex justify-between p-2 items-center">
                        <Link href={"/"} className="bg-blue-600 text-white  rounded-full text-2xl font-bold p-1 px-3">
                            T
                        </Link>
                        <div className="flex-1"> 
                            <form onSubmit={handleLogin} className="flex gap-2 items-center  justify-end">
                                <input 
                                onChange={handleChange}
                                name="email"
                                value={info.email} 
                                type="email"
                                autoComplete="true" 
                                placeholder="Email address"
                                className={`${errors.email ?"border-accent border":""} p-2 focus-within:outline-none focus-within:border-blue-400 focus-within:placeholder:opacity-70 max-w-[180px]`}/>
                                <input 
                                onChange={handleChange}
                                name="password"
                                value={info.password} 
                                type="password" 
                                placeholder="Password"
                                className={`${errors.password ?"border-accent border":""} p-2 focus-within:outline-none focus-within:border-blue-400 focus-within:placeholder:opacity-70 max-w-[180px]`}/>
                                <button className="bg-blue-500 text-white p-1 rounded-lg px-3 h-[42px] hover-opacity active:scale-90">
                                        Log in
                                </button>
                                <Link href={"/auth/recovery"} className="text-sm text-blue-500 cursor-pointer hover-opacity">Forgot password ?</Link>
                            </form>
                        </div>
                    </div>
            </div>}
        
        </>
    )
}