import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import { UserType } from "@/lib/utils/types/user";
import WorkplaceAbout from "./workPlace";
export default function OverView({moreInfo,view,user}:{
    moreInfo:MoreInfoType;
    view?:boolean;
    user:UserType|null
}) {

    return (
        <div className="flex gap-5 flex-col py-8 px-3 flex-1">
            <WorkplaceAbout moreInfoWork={moreInfo.work} user={user} view={view} />
            <>

            </>
        </div>
    )
}