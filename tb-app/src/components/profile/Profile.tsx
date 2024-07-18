import { UserType } from "@/lib/utils/types/user"
import { useEffect, useState } from "react"
import User from "@/lib/classes/User"
import { useToast } from "@/assets/Wrappers/toastWrapper"
import ProfileTemplate from "./profileTemplate"
import { UserDataType} from "@/lib/utils/types/user"

export default function Profile({user}:{
    user:UserType
}) {
    const [userData,setUserData] = useState<UserDataType>()
    const {username} = user
    const {toast} = useToast()
    useEffect(() => {
        if(!username) return
        const getUsers = async() => {
            const res = await new User(username).getUserData()
            if(!res?.success) {
                return toast({
                    varient:"error",
                    description:res?.error as string,
                    title:"Error"
                })
            }
            setUserData(res.data as UserDataType)
        }
        getUsers()
    },[username])
    return (
        <div>
            {userData&&<ProfileTemplate userData={userData}/> }
        </div>
    )
}