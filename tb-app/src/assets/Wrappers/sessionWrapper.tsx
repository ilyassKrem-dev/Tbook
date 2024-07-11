"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useContext,createContext,useState,useEffect } from "react"
type UserType = {
    id:string;
    name:string;
    email:string;
    image:string | null |undefined;
    status:string;
}
type SessionType = {
    user :UserType | null,
    loginStatus:string |null
}
const SessionContext = createContext<SessionType|null>(null)

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
    useEffect(() => {
        if(status==="loading") return
        if(status === "unauthenticated") return router.push('/signin')
        setUser(session?.user as UserType || null)
        setLoginStatus(status)
    },[session])

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