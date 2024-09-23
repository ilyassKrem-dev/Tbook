"use client"
import { useSession } from "next-auth/react"
import { useRouter,usePathname } from "next/navigation"
import { useContext,createContext,useState,useEffect } from "react"
import LaodingFullScreen from "@/shared/loadingFull"
import { UserType } from "@/lib/utils/types/user"
import StatusWrapper from "./statusWrapper"
import { updateStatus } from "../status/utils"


type SessionType = {
    user :UserType | null,
    loginStatus:string |null,
}

const SessionContext = createContext<SessionType|undefined>(undefined)
const paths = ["/", "/auth/signin", "/auth/login"];
const dynamicPaths = [/^\/profile\/[^\/]+$/];

export const loginInfo = ()=>{
    const context = useContext(SessionContext)
    if(!context) {
        throw new Error(``)
    }
    return context
}

const matchesDynamicPath = (path: string) => {
    return dynamicPaths.some(pattern => pattern.test(path));
};

export const SessionWrapper = ({children}:{children:React.ReactNode}) => {
    const [user,setUser] = useState<UserType|null>(null)
    const [loginStatus,setLoginStatus] = useState<string|null>(null)
    const {data:session,status,update} = useSession()
    const router = useRouter()
    const pathname = usePathname()
    
    useEffect(() => {
        if(status==="loading") return
        if(status === "unauthenticated" && !paths.includes(pathname as string) && !matchesDynamicPath(pathname as string)) {
            return router.push("/auth/login")
        }
        setUser(session?.user as UserType)
        setLoginStatus(status)
        if(session?.user &&(session?.user as any).status=="offline") {
            updateStatus(user,"online")
        }
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
            <StatusWrapper>
                {children}
            </StatusWrapper>
            
        </SessionContext.Provider>
    )
}