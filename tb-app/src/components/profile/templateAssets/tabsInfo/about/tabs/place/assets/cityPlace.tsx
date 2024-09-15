import { UserType } from "@/lib/utils/types/user";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import { useState } from "react"
import InfoShow from "../../../shared/infoShow";
import InfoEdit from "../../../shared/infoEdit";

import { FaMapLocationDot } from "react-icons/fa6";


export default function CityPlace({moreInfo,view,user}:{
    moreInfo:MoreInfoType;
    view?:boolean;
    user:UserType|null
}) {

    const [city,setCity] = useState<string|null>(moreInfo.city)
    const [edit,setEdit] = useState<boolean>(false)
    return (
        <>
            {!edit&&
            <InfoShow 
                value={city}
                setValue={setCity}
                setEdit={setEdit}
                userId={user?.id as string}
                type="work"
                text="workplace"
                absentType="HomeTown"
                view={view}
                icon={<FaMapLocationDot />}
            />}
            {!view&&edit&&<InfoEdit
            setEdit={setEdit}
            setValue={setCity}
            value={city}
            user={user}
            type="work"
            text="Company"
            />}
        </>
    )
}