
import TopNav from "@/shared/navTop/topNav"
import { UserType } from "@/lib/utils/types/user"
export default function Home({user}:{
    user:UserType
}) {

    return (
        <>
            <TopNav />  
            <div className="h-screen flex flex-col gap-40">
                <div>
                    left
                </div>
                Test

                <div>
                    right
                </div>
            </div>  
        </>
       
    )

}