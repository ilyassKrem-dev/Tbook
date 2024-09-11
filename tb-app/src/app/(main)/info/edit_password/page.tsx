"use client"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import PasswordChange from "@/components/changePass&Email/passwordChange";




export default function Page() {
    const {user} = loginInfo()
    return (
        <>
            {user&&<PasswordChange />}
        </>
        
    )
}