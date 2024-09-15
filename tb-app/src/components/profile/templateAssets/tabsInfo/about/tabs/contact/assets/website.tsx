import { UserType } from "@/lib/utils/types/user";
import { SetStateAction, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import InfoEdit from "../../../shared/infoEdit";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import InfoShow from "../../../shared/infoShow";
import { CgWebsite } from "react-icons/cg";




export default function WebsiteAbout({websiteInfo,view,user,setMoreInfo}:{
    websiteInfo:string|null;
    view?:boolean;
    user:UserType|null;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>
}) {
    const [website,setWebsite] = useState<string|null>(websiteInfo)
    const [edit,setEdit] = useState<boolean>(false)
    return (
        <>
           {!edit&&<div>
                {!website&&!view&&<div className=" cursor-pointer active:scale-95 flex gap-3 items-center group" onClick={() => setEdit(true)}>
                    <div className="text-lg text-blue-500 border rounded-full border-blue-500 p-1 w-fit">
                        <FaPlus/>
                    </div>
                    <p className="text-blue-500  cursor-pointer font-medium group-hover:underline transition-all duration-300">Add a website</p>
                </div>}
                {website&&
                <InfoShow 
                value={website}
                setValue={setWebsite}
                setEdit={setEdit}
                userId={user?.id as string}
                type="website"
                text=""
                absentType=""
                view={view}
                isLink
                setMoreInfo={setMoreInfo}
                icon={<CgWebsite />}
                />}
            </div>}
            {!view&&edit&&
            <InfoEdit
            setEdit={setEdit}
            setValue={setWebsite}
            value={website}
            user={user}
            setMoreInfo={setMoreInfo}
            type="website"
            text="Website"
            />}
        </>
    )
}