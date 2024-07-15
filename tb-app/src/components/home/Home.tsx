
import TopNav from "@/shared/navTop/topNav"
import { UserType } from "@/lib/utils/types/user"
import LeftTabs from "./leftTabs/leftTabs"
import { useSize } from "@/lib/utils/hooks"
import RightHome from "./right/rightHome"
export default function Home({user}:{
    user:UserType
}) {
    const {w} = useSize()
    return (
        <>
            <TopNav />  
            {user&&<div className="h-screen flex  gap-10 pt-20">
                {w>1023&&<LeftTabs user={user}/>}
                
                <div className="flex-1">
                    middle
                </div>
                

                {w>830&&<RightHome user={user}/>}
            </div> }
        </>
       
    )

}