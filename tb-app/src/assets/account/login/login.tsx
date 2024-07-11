"use client"
import Link from "next/link"
import { useSize } from "@/lib/utils/hooks"


export default function Login() {
    const size= useSize()
    console.log(size)
    return (
        <div className="bg-white p-4 rounded-xl flex flex-col items-center gap-5">
            <p className="text-lg">Login to Tbook</p>
            <div className="flex flex-col items-center gap-5 border-b pb-4">
                <div className="w-[330px]">
                    <input type="email" placeholder="Email address"/>
                </div>
                <div className="w-[330px]">
                    <input type="password" placeholder="Password"/>
                </div>
                <p className="text-sm text-blue-500 cursor-pointer hover-opacity">Forgot password ?</p>
                <button className="bg-blue-500 rounded-lg w-full h-full text-white p-3 text-lg  hover-opacity">
                    Login
                </button>
                
            </div>

            <Link href={""} className="h-full w-full bg-green-1 text-lg text-white rounded-lg text-center p-3 hover-opacity">
                Create account
            </Link>
        </div>
    )
}