import { UserType } from "@/lib/utils/types/user";
import InfoShow from "../../../shared/infoShow";
import { MdOutlineWork } from "react-icons/md";
import InfoEdit from "../../../shared/infoEdit";
import { SetStateAction, useState } from "react";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";



export default function WorkplaceAbout({moreInfoWork,user,view,setMoreInfo}:{
    moreInfoWork:string|null;
    user:UserType|null;
    view?:boolean;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>
}) {
    const [work,setWork] = useState<string|null>(moreInfoWork)
    const [edit,setEdit] = useState<boolean>(false)
    return (
        <>
            {!edit&&
            <InfoShow 
                value={work}
                setValue={setWork}
                setEdit={setEdit}
                userId={user?.id as string}
                type="work"
                text="workplace"
                absentType="Works at"
                view={view}
                setMoreInfo={setMoreInfo}
                icon={<MdOutlineWork />}
            />}
            {!view&&edit&&<InfoEdit
            setEdit={setEdit}
            setValue={setWork}
            value={work}
            user={user}
            setMoreInfo={setMoreInfo}
            text="Company"
            type="work"
            />}
        </>
    )
}