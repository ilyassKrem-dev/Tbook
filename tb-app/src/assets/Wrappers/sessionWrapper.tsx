"use client"
import { useSession } from "next-auth/react"
import { useRouter,usePathname } from "next/navigation"
import { useContext,createContext,useState,useEffect } from "react"
import LaodingFullScreen from "@/shared/loadingFull"
import { UserType } from "@/lib/utils/types/user"

type SessionType = {
    user :UserType | null,
    loginStatus:string |null,
}
const SessionContext = createContext<SessionType|undefined>(undefined)
const paths = ["/","/auth/signin","/auth/login","/*","/profile","/profile/**"]
export const loginInfo = ()=>{
    const context = useContext(SessionContext)
    if(!context) {
        throw new Error(``)
    }
    return context
}

export const SessionWrapper = ({children}:{children:React.ReactNode}) => {
    const [user,setUser] = useState<UserType|null>(null)
    const [loginStatus,setLoginStatus] = useState<string|null>(null)
    const {data:session,status} = useSession()
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if(status==="loading") return
        if(status === "unauthenticated" && !paths.includes(pathname)) {
            return router.push("/auth/login")
        }
        setUser(session?.user as UserType)
        setLoginStatus(status)
        
    },[session])
    if(status == "loading") {
        return <LaodingFullScreen />
    }
    return (
        <SessionContext.Provider value={
            {
                user,
                loginStatus
            }
        }>
            {children}
        </SessionContext.Provider>
    )
}