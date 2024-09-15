import { UserType } from "@/lib/utils/types/user";
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import { SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import InfoShow from "../../../shared/infoShow";
import { IoLanguageOutline } from "react-icons/io5";
import InfoEdit from "../../../shared/infoEdit";




export default function LanguageContact({languageInfo,view,user,setMoreInfo}:{
    languageInfo:string|null;
    view?:boolean;
    user:UserType|null;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>
}) {
    const [language,setLanguage] = useState<string|null>(languageInfo)
    const [edit,setEdit] = useState<boolean>(false)
    return (
        <>
           {!edit&&<div>
                {!language&&!view&&<div className=" cursor-pointer active:scale-95 flex gap-3 items-center group" onClick={() => setEdit(true)}>
                    <div className="text-lg text-blue-500 border rounded-full border-blue-500 p-1 w-fit">
                        <FaPlus/>
                    </div>
                    <p className="text-blue-500  cursor-pointer font-medium group-hover:underline transition-all duration-300">Add a language</p>
                </div>}
                {language&&
                <InfoShow 
                value={language}
                setValue={setLanguage}
                setEdit={setEdit}
                userId={user?.id as string}
                type="language"
                text=""
                absentType=""
                view={view}
                setMoreInfo={setMoreInfo}
                icon={<IoLanguageOutline />}
                />}
            </div>}
            {!view&&edit&&
            <InfoEdit
            setEdit={setEdit}
            setValue={setLanguage}
            value={language}
            user={user}
            setMoreInfo={setMoreInfo}
            type="language"
            text="Language"
            />}
        </>
    )
}