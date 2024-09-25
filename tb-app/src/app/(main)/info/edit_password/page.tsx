"use client"
import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper";
import PasswordChange from "@/components/changePass&Email/passwordChange";




export default function Page() {
    const {user} = useLoginInfo()
    return (
        <>
            {user&&<PasswordChange />}
        </>
        
    )
}