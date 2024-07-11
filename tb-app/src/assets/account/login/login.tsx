"use client"
import Link from "next/link"


export default function Login() {
  
    return (
        <div className="bg-white p-4 rounded-xl flex flex-col items-center gap-5">
            <p className="text-lg font-semibold">Log in to Tbook</p>
            <div className="flex flex-col items-center gap-5 border-b pb-4">
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <input type="email" placeholder="Email address"/>
                </div>
                <div className="w-[330px] max-[360px]:w-[260px] md:w-[370px]">
                    <input type="password" placeholder="Password"/>
                </div>
                <Link href={"/recovery"} className="text-sm text-blue-500 cursor-pointer hover-opacity">Forgot password ?</Link>
                <button className="bg-blue-500 rounded-lg w-full h-full text-white p-3 text-md  hover-opacity">
                    Login
                </button>
                
            </div>

            <Link href={"/signin"} className="h-full w-full bg-green-1 text-md text-white rounded-lg text-center p-3 hover-opacity">
                Create account
            </Link>
        </div>
    )
}