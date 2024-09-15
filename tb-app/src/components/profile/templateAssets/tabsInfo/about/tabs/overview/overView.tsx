import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import { UserType } from "@/lib/utils/types/user";
import WorkplaceAbout from "./assets/workPlace";
import CountryAbout from "./assets/countryAbout";
import SchoolAbout from "./assets/school";
import { SetStateAction } from "react";
export default function OverView({moreInfo,view,user,setMoreInfo}:{
    moreInfo:MoreInfoType;
    view?:boolean;
    user:UserType|null;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>
}) {

    return (
        <div className="flex-1 h-full">
            <div className="flex gap-7 flex-col py-8 px-3 ">
                <WorkplaceAbout moreInfoWork={moreInfo.work} user={user} view={view} setMoreInfo={setMoreInfo}/>
                <SchoolAbout moreInfoSchool={moreInfo.school} user={user} view={view} setMoreInfo={setMoreInfo}/>
                <CountryAbout moreInfoCountry={moreInfo.country} user={user} view={view} setMoreInfo={setMoreInfo}/>

            </div>
        </div>
    )
}