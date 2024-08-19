
import { SetStateAction, useState } from "react"
import { UserType } from "@/lib/utils/types/user"
import { FriendType } from "@/lib/utils/types/friend"
import Friend from "@/lib/classes/Friend"
import LeftTemplate from "../../shared/leftTemplate"
import { useSize } from "@/lib/utils/hooks"
import ReqLeftSm from "./sm/reqLeftSm"
import ReqLeftLg from "./lg/reqLeftLg"

export default function RequestLeft({loggedInfo,requests,setRequests}:{
    loggedInfo:UserType;
    requests:FriendType[];
    setRequests:React.Dispatch<SetStateAction<FriendType[]>>
}) {
    const [loading,setLoading] = useState<number>(0)
    const handleConfrim = async(e:any,other_id:number) => {
        e.preventDefault()
        if(loading!==0) return
        setLoading(other_id)
        const res = await Friend.addFriend(loggedInfo.id,other_id.toString())
        if(res?.success) {
            setLoading(0)
            setRequests(prev => (prev.filter(req=>req.user.id!==other_id)))
        }
    }
    const handleDecline = async(e:any,other_id:number) => {
        e.preventDefault()
        setRequests(prev => (prev.filter(req=>req.user.id!==other_id)))
        await Friend.removeFriend(loggedInfo.id,other_id.toString(),"")
    }
  
    const {w} = useSize()
    return (
        <LeftTemplate>
            {w>767&&
            <ReqLeftLg 
            handleConfrim={handleConfrim}
            handleDecline={handleDecline}
            requests={requests}
            loading={loading}/>}
            {w<=767&&
            <ReqLeftSm 
            handleConfrim={handleConfrim}
            handleDecline={handleDecline}
            requests={requests}
            loading={loading}/>}
        </LeftTemplate>
        
    )
}