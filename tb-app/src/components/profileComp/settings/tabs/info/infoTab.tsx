import { UserType } from "@/lib/utils/types/user"
import { FaEdit } from "react-icons/fa"
import ToInput from "./assets/toInput"
import Infos from "./assets/infos"
import { useState } from "react"
import Link from "next/link"

export default function InfoTab({user}:{
    user:UserType
}) {    
    const [showInput,setShowInput] = useState<string>("")
    console.log(user)
    return (
        <div className="p-8 lg:p-12">
            <h1 className="font-bold text-xl">Account informations</h1>
            <div className="mt-5 flex gap-2 flex-col">
                <Infos 
                value={user.name} 
                name="name" 
                placeHolder="Name"
                show={showInput}
                setShow={setShowInput}/>
                <Infos 
                value={user.username} 
                name="username" 
                placeHolder="Username"
                show={showInput}
                setShow={setShowInput}/>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col p-2 roudned-lg bg-gray-300/20 rounded-xl ">
                        <h3 className="font-semibold text-lg capitalize">Email</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-base  font-medium">{user.email}</p>
                            <Link href={"/profile/edit_email"} className="text-xl text-green-600 cursor-pointer active:scale-95 relative flex justify-center items-center group hover:bg-black/10 transition-all duration-300 rounded-full p-1">
                                <FaEdit />
                                <div className="absolute top-[2rem] rounded-lg p-1 px-2 bg-black/50 text-white text-xs group-hover:block hidden transition-all duration-300">
                                    <span>Edit</span>
                                </div>  
                            </Link>
                        </div>
                    </div>

                </div> 
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col p-2 roudned-lg bg-gray-300/20 rounded-xl ">
                        <h3 className="font-semibold text-lg capitalize">Passowrod</h3>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    {[...Array(10)].map((_,index) => {
                                        return (
                                            <p key={index} className="text-2xl font-bold" dangerouslySetInnerHTML={{__html:"&centerdot;"}}/>
                                        )
                                    })}
                                </div>
                                
                                <Link href={"/profile/edit_password"} className="text-xl text-green-600 cursor-pointer active:scale-95 relative flex justify-center items-center group hover:bg-black/10 transition-all duration-300 rounded-full p-1">
                                    <FaEdit />
                                    <div className="absolute top-[2rem] rounded-lg p-1 px-2 bg-black/50 text-white text-xs group-hover:block hidden transition-all duration-300">
                                        <span>Change</span>
                                    </div>  
                                </Link>
                            </div>

                    </div>

                </div>
            </div>

        </div>
    )
}