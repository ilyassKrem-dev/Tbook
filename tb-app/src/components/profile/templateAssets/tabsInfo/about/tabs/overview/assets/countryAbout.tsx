import { UserType } from "@/lib/utils/types/user";
import { SetStateAction, useState } from "react"
import InfoShow from "../../../shared/infoShow";
import InfoEdit from "../../../shared/infoEdit";
import { FaLocationDot } from "react-icons/fa6";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";



export default function CountryAbout({moreInfoCountry,view,user,setMoreInfo}:{
    moreInfoCountry:string|null;
    view?:boolean;
    user:UserType|null;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>
}) {

    const [country,setCountry] = useState<string|null>(moreInfoCountry)
    const [edit,setEdit] = useState<boolean>(false)
    return (
        <>
            {!edit&&
            <InfoShow 
                value={country}
                setValue={setCountry}
                setEdit={setEdit}
                userId={user?.id as string}
                type="country"
                text="places"
                absentType="From"
                view={view}
                setMoreInfo={setMoreInfo}
                icon={<FaLocationDot />}
            />}
            {!view&&edit&&<InfoEdit
            setEdit={setEdit}
            setValue={setCountry}
            value={country}
            user={user}
            setMoreInfo={setMoreInfo}
            type="country"
            text="Country"
            />}
        </>
    )
}