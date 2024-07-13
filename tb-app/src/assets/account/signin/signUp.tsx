"use client"
import { currentDate } from "@/lib/utils/simpleUtils";
import { allDates } from "@/lib/utils/simpleUtils";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { SignInInfoType } from "@/lib/utils/types/auth";
import Auth from "@/lib/classes/Auth";
import { validationErrors } from "@/lib/utils/validations";
import { signIn } from "next-auth/react";
import { useToast } from "@/assets/Wrappers/toastWrapper"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignUp() {
    const {day,month,year} = currentDate()
    const [info,setInfo] = useState<SignInInfoType>({
        name:"",username:"",email:"",
        password:"",password_confirm:"",
        date:{
            day:day.toString(),
            month:month,
            year:year
        },
        gender:""
    })
    const [errors,setErrors] = useState({
        name:"",username:"",email:"",date:"",password:"",password_confirm:"",gender:""
    })
    const {toast} = useToast()
    const {days,months,years} = allDates()
    const pathname = usePathname()
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setErrors(prev=>({...prev,[name]:""}))
        setInfo(prev=>({...prev,[name]:value}))
    }
    const handleSelectChange = (e:ChangeEvent<HTMLSelectElement>) => {
        const {name,value} = e.target
        setErrors(prev=>({...prev,date:""}))
        setInfo(prev=>({...prev,date:{...prev.date,[name]:value}}))
    }
    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault()
        const errors = validationErrors({info,setErrors}) 
        if(errors) {
            return
        }
       
        const res = await Auth.signIn(info)
        if(res?.success) {
           
            await signIn("credentials",{email:res.email,callbackUrl:"/"})
        }
        if(res?.success == false) {
            
            return setErrors(res.errors as any)
        }
        if(res?.success == null) {
            return toast({
                varient:"error",
                title:"Error",
                description:res?.errors as string
            })
        }
    }
    const {date} = info
    
    return (
        <div className=" p-4 rounded-xl flex flex-col items-center gap-5 h-full justify-center">
            <p className="text-lg font-semibold">Sign up to Tbook</p>
            <form
            onSubmit={handleSubmit} 
            className="flex flex-col items-center gap-4 border-b">
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <p className="break-words text-accent text-sm">{errors.name}</p>
                    <input 
                    type="text" 
                    name="name"
                    autoComplete="true"
                    className={`${errors.name ? "border-accent border": ""}`}
                    value={info.name}
                    onChange={handleChange} 
                    id="name" 
                    placeholder="Full name"/>
                </div>
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <p className="break-words text-accent text-sm">{errors.username}</p>
                    <input 
                    type="text"
                    autoComplete="true"
                    value={info.username}
                    className={`${errors.username ? "border-accent border": ""}`}
                    onChange={handleChange}
                    name="username" 
                    id="username" 
                    placeholder="Username"/>
                </div>
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <p className="break-words text-accent text-sm">{errors.email}</p>
                    <input type="email" 
                    name="email" 
                    id="email"
                    autoComplete="true"
                    className={`${errors.email ? "border-accent border": ""}`}
                    value={info.email}
                    onChange={handleChange}
                    placeholder="Email address"/>
                </div>
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <p className="break-words text-accent text-sm">{errors.date}</p>
                    <p className="text-sm">Date of birth</p>
                    
                    <div className="flex justify-between gap-1">
                        <select 
                        name="day"
                        className={`${errors.date ? "border-accent border": ""} w-full py-2`}
                        value={date.day} 
                        onChange={handleSelectChange} 
                        id="day" >
                            {days.map((d,index) => {
                                if(Number(d)<10) {
                                    return (
                                        <option key={index} value={"0"+d} >
                                            {"0"+d}
                                        </option>
                                    )
                                }
                                return (
                                    <option key={index} value={d} >
                                        {d}
                                    </option>
                                )
                            })}
                        </select>
                        <select
                        name="month" 
                        value={date.month} 
                        onChange={handleSelectChange} 
                        id="month" 
                        className={`${errors.date ? "border-accent border": ""} w-full py-2`}>
                            {months.map((m,index) => {
                                return (
                                    <option key={index} value={m}>
                                        {m}
                                    </option>
                                )
                            })}
                        </select>
                        <select 
                        value={date.year} 
                        onChange={handleSelectChange} 
                        name="year" 
                        id="year" 
                        className={`${errors.date ? "border-accent border": ""} w-full py-2`}>
                            {years.map((y,index) => {
                                return (
                                    <option key={index} value={y} >
                                        {y}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <p className="break-words text-accent text-sm">{errors.password}</p>
                    <input 
                    type="password"
                    value={info.password}
                    className={`${errors.password ? "border-accent border": ""}`}
                    onChange={handleChange}
                    name="password"
                    id="password" 
                    placeholder="Password"/>
                </div>
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <p className="break-words text-accent text-sm">{errors.password_confirm}</p>   
                    <input 
                    type="password"
                    id="password_confirm"
                    className={`${errors.password_confirm ? "border-accent border": ""}`}
                    name="password_confirm"
                    value={info.password_confirm}
                    onChange={handleChange}
             
                    placeholder="Confirm password "/>
                </div>
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">  
                    <p className="text-accent text-sm break-words">{errors.gender}</p>
                    <p className="text-sm">Gender</p>
                    
                    <div className="flex gap-1 items-center ">
                        <div className={`flex  items-center border rounded-md p-2  bg-white text-lg  justify-start flex-1 cursor-pointer ${errors.gender ? "border-accent": "border-white-1"}`}>
                            <input 
                            type="radio" 
                            name="gender"
                            value="female"
                            className={`${errors.gender ? "border-accent border": ""} w-fit cursor-pointer`}
                            onChange={handleChange}
                        
                            id="F_gender" 
                            />
                            <label htmlFor="F_gender" className="w-full cursor-pointer pl-3">Female</label>
                        </div>
                        <div  className={`flex  items-center border rounded-md p-2  bg-white text-lg flex-1 cursor-pointer ${errors.gender ? "border-accent ": "border-white-1"}`}>
                            <input 
                            type="radio" 
                            name="gender"
                            value={"male"}
                            onChange={handleChange} 
                            id="M_gender"
                             
                            className="w-fit cursor-pointer"/>
                            <label htmlFor="M_gender" className="w-full cursor-pointer pl-3">Male</label>
                        </div>
                    </div>
                    
                </div>
                <button className="bg-blue-500 rounded-lg w-full h-full text-white p-3 text-md  hover-opacity mt-2">
                    Sign in
                </button>
            </form>
            {pathname!=="/"&&<Link href={"/auth/login"} className="underline text-sm text-blue-500 hover:opacity-60 transition-all duration-300 active:opacity-40">
                Already have an account?
            </Link>
}
        </div>
    )
}