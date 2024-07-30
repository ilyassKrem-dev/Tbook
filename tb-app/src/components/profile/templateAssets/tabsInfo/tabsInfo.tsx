import { UserDataType, UserType } from "@/lib/utils/types/user"
import PostsTab from "./posts/postsTab"
import { useSearchParams } from "next/navigation";

export default function TabsInfo({userData,loggedInfo,view}:{
    userData:UserDataType;
    loggedInfo:UserType|null;
    view?:boolean
}) {
    const searchParams = useSearchParams()
    const tabString = searchParams?.get("sk")
    return (
        <div className="mt-3">
            {!tabString&&<PostsTab view={view}  userData={userData} />}
            <div className="bg-white rounded-lg w-full p-3 px-4">
                <div className="flex justify-between items-center"> 
                    <h1 className="font-bold text-xl capitalize">friends</h1>
                    <div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}