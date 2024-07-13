"use client"

import { SetStateAction, useEffect, useState } from "react"


export default function Toast({varient,title,description,show,setShow}:{
    varient:"success" | "error";
    title:string;
    description:string;
    show:boolean;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    useEffect(() => {
        const removeToast = (e:any) => {
            const overlay = document.querySelector('.toast')
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener('click',removeToast)

        return () => document.removeEventListener('click',removeToast)
    },[])
    if(varient === "error") {
        return (
            <>
            {show&&<div className="fixed top-5 left-0 right-0 flex justify-center items-center">
                <div className="bg-accent/80 text-white rounded-lg w-[330px] max-[360px]:w-[260px] md:w-[370px] toast">
                    <div className="border-b p-2 flex justify-between items-center">
                        <p className=" capitalize">{title}</p>
                        <div className="border rounded-md p-1 hover:opacity-60 transition-all duration-300 cursor-pointer  text-white" onClick={() => setShow(false)}>
                            Close
                        </div>
                    </div>
                    <div className="p-3 break-words">
                        {description}
                    </div>
                </div>
            </div>}
        
        </>
        )
        }
    return (
        <>
            {show&&<div className="fixed top-5 left-0 right-0 flex justify-center items-center">
                <div className="bg-green-1 text-white rounded-lg w-[330px] max-[360px]:w-[260px] md:w-[370px] toast">
                    <div className="border-b p-2 flex justify-between items-center">
                        <p className=" capitalize ">{title}</p>
                        <div className="border rounded-md p-1 hover:opacity-60 transition-all duration-300 cursor-pointer" onClick={() => setShow(false)}>
                            Close
                        </div>
                    </div>
                    <div className="p-3 break-words">
                        {description}
                    </div>
                </div>
            </div>}
        
        </>
    )
} 