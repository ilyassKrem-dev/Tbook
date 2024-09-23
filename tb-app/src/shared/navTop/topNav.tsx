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
        <div className={`fixed  right-0 left-0 z-50   ${pathname!=="/stories/create"?"bg-white top-0 shadow-[-1px_4px_3px_1px_rgba(232,229,229,1)]":" min-[954px]:top-7"}`}>
            {user&&<div className={`w-full flex  items-center relative ${w>953 ?" justify-center":" justify-between"}`}>
                <LogoASearch w={w}/>
                {w>660&&pathname!=="/stories/create"&&<Navigation />}
                <UserActions user={user as UserType} w={w}/>
               
            </div>}
            
        </div>
    )
}