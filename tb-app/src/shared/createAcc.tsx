
import SignUp from "@/assets/account/signin/signUp"
import React, { SetStateAction, useEffect } from "react"

export default function CreateAccount({setShow}:{
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    
    useEffect(() => {
        const removeToast = (e:any) => {
            const overlay = document.querySelector('.create')
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener('click',removeToast)
    
        return () => document.removeEventListener('click',removeToast)
  
    },[])
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center flex-col">
            <div className="bg-white border rounded-lg z-50 create">
                <SignUp />
            </div>
           
        </div>
    )
}