
import TopNav from "@/shared/navTop/topNav"
import { UserType } from "@/lib/utils/types/user"
import LeftTabs from "./leftTabs/leftTabs"
import { useSize } from "@/lib/utils/hooks"
import RightHome from "./right/rightHome"
import MiddleHome from "./middle/middleHome"


export default function Home({user}:{
    user:UserType
}) {
    const {w} = useSize()
    
    return (
        <>
            <TopNav />  
            {user&&<div className="min-h-screen flex  gap-10 pt-20">
                {w>1023&&<LeftTabs user={user}/>}
                
                <MiddleHome  userDetails={user}/>
                

                {w>830&&<RightHome user={user}/>}
            </div> }
            
        </>
       
    )

}