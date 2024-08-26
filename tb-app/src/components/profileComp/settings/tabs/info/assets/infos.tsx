import { SetStateAction, useState } from "react"
import { FaEdit } from "react-icons/fa"
import ToInput from "./toInput"
import { AnimatePresence,motion } from "framer-motion";



export default function Infos({value,placeHolder,name,show,setShow}:{
    value:string;
    placeHolder:string;
    name:"username"|"name"|"phone";
    show:string;
    setShow:React.Dispatch<SetStateAction<string>>
    
}) {

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col p-2 roudned-lg bg-gray-300/20 rounded-xl ">
                <h3 className="font-semibold text-lg capitalize">{name}</h3>
                <AnimatePresence>
                    {show!==name&&
                    <div className="flex justify-between items-center">
                        <p className="text-base  font-medium">{value}</p>
                        <div className="text-xl text-green-600 cursor-pointer active:scale-95 relative flex justify-center items-center group hover:bg-black/10 transition-all duration-300 rounded-full p-1" onClick={() => setShow(name)}>
                            <FaEdit />
                            <div className="absolute top-[2rem] rounded-lg p-1 px-2 bg-black/50 text-white text-xs group-hover:block hidden transition-all duration-300">
                                <span>Edit</span>
                            </div>  
                        </div>
                    </div>}
                    {show===name&&
                    <div className="flex flex-col gap-4">
                        <ToInput 
                        value={value} 
                        placeHolder={placeHolder} 
                        type={name} 
                        setShow={setShow}/>
                    </div>}
                </AnimatePresence>
            </div>

        </div> 
    )
}