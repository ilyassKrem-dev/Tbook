
import { UserDataType, UserType} from "@/lib/utils/types/user"

import CoverImage from "./templateAssets/coverImage";
import ProfileInfo from "./templateAssets/profileInfo";
import TabsInfo from "./templateAssets/tabsInfo/tabsInfo";
import { useSize } from "@/lib/utils/hooks";
export default function ProfileTemplate({userData,loggedInfo,view,fromRequest}:{
    userData:UserDataType;
    loggedInfo:UserType|null;
    view?:boolean;
    fromRequest?:boolean
}) {
    const {user,friends} = userData
    const {w} = useSize()
    
    return (
        <>
            <div className=" bg-white rounded-b-xl">
                <div className="w-full max-w-[1250px] mx-auto">
                    <CoverImage 
                    coverImage={user.cover_photo}
                    userId={user.id} 
                    loggedInfo={loggedInfo}
                    view={view}/>
                    <div className="max-w-[1218px] w-full mx-auto">
                        <ProfileInfo 
                        userData={userData}
                        loggedInfo={loggedInfo}
                        view={view}
                        fromRequest={fromRequest}/>
                    
                    </div>
                    
                </div>
            </div>
            <div className="max-w-[1218px] w-full mx-auto">
                <TabsInfo 
                userData={userData} 
                loggedInfo={loggedInfo}
                view={view}/>
            </div>
            
        </>
    )
}