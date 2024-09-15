import { UserType } from "@/lib/utils/types/user";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc"
import { SetStateAction, useState } from "react";
import InfoShow from "../../shared/infoShow";
import { FaMapLocationDot } from "react-icons/fa6";
import InfoEdit from "../../shared/infoEdit";




export default function Place({moreInfo,view,user,setMoreInfo}:{
    moreInfo:MoreInfoType;
    view?:boolean;
    user:UserType|null;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>
}) {
    
    const [city,setCity] = useState<string|null>(moreInfo.city)
    const [edit,setEdit] = useState<boolean>(false)
    return (
        <div className="flex-1 h-full">
            <div className="flex flex-col gap-3 py-4 px-3">
                <h1 className="font-bold text-lg">Places lived</h1>
                <>
                    {!edit&&
                    <InfoShow 
                        value={city ? city+`${moreInfo.country?", "+moreInfo.country:""}`:null}
                        setValue={setCity}
                        setEdit={setEdit}
                        userId={user?.id as string}
                        type="city"
                        text="places"
                        absentType=""
                        view={view}
                        setMoreInfo={setMoreInfo}
                        icon={<FaMapLocationDot />}
                    />}
                    {!view&&edit&&<InfoEdit
                    setEdit={setEdit}
                    setValue={setCity}
                    value={city}
                    user={user}
                    setMoreInfo={setMoreInfo}
                    type="city"
                    text="City"
                    />}
                </>
            </div>
        </div>
    )
}