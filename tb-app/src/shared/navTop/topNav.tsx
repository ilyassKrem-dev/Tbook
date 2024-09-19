"use client"
import LogoASearch from "./logo-search/logoASearch"
import Navigation from "./navigation/navigation"
import UserActions from "./userActions/userActions"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import { UserType } from "@/lib/utils/types/user"
import { useSize } from "@/lib/utils/hooks"
import { usePathname } from "next/navigation"
export default function TopNav() {
    const {user,loginStatus} = loginInfo()
    const {w} = useSize()
    const pathname = usePathname()
    return (
        <div className="fixed top-0 right-0 left-0 z-50 bg-white shadow-[-1px_4px_3px_1px_rgba(232,229,229,1)]">
            {user&&<div className={`w-full flex  items-center relative ${w>953 ?" justify-center":" justify-between"}`}>
                <LogoASearch w={w}/>
                {w>660&&<Navigation />}
                <UserActions user={user as UserType} w={w}/>
               
            </div>}
            
        </div>
    )
}