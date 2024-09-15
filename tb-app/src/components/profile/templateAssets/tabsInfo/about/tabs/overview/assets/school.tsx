import { UserType } from "@/lib/utils/types/user";
import { SetStateAction, useState } from "react";
import InfoShow from "../../../shared/infoShow";
import InfoEdit from "../../../shared/infoEdit";
import { IoSchoolSharp } from "react-icons/io5";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";




export default function SchoolAbout({moreInfoSchool,user,view,setMoreInfo}:{
    moreInfoSchool:string|null;
    view?:boolean;
    user:UserType|null;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>

    
}) {
    const [school,setSchool] = useState<string|null>(moreInfoSchool)
    const [edit,setEdit] = useState<boolean>(false)
    return (
        <>
            {!edit&&
            <InfoShow 
                value={school}
                setValue={setSchool}
                setEdit={setEdit}
                userId={user?.id as string}
                type="school"
                text="school"
                absentType="Went to"
                view={view}
                setMoreInfo={setMoreInfo}
                icon={<IoSchoolSharp />}
            />}
            {!view&&edit&&<InfoEdit
            setEdit={setEdit}
            setValue={setSchool}
            value={school}
            user={user}
            setMoreInfo={setMoreInfo}
            type="school"
            text="School"
            />}
        </>
    )
}