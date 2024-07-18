
import SignUp from "@/assets/account/signin/signUp"
import { removeOverlay } from "@/lib/utils/hooks"
import React, { SetStateAction, useEffect } from "react"

export default function CreateAccount({setShow}:{
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    removeOverlay({
        tab:".create",
        setShow:setShow
    })
    
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center flex-col">
            <div className="bg-white border rounded-lg z-50 create">
                <SignUp />
            </div>
           
        </div>
    )
}