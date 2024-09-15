import { UserType } from "@/lib/utils/types/user";
import InfoShow from "../../shared/infoShow";
import { MdOutlineWork } from "react-icons/md";
import InfoEdit from "../../shared/infoEdit";
import { useState } from "react";



export default function WorkplaceAbout({moreInfoWork,user,view}:{
    moreInfoWork:string|null;
    user:UserType|null;
    view?:boolean
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
                absentType="Works"
                view={view}
                icon={<MdOutlineWork />}
            />}
            {!view&&edit&&<InfoEdit
            setEdit={setEdit}
            setValue={setWork}
            value={work}
            user={user}
            type="Company"
            />}
        </>
    )
}