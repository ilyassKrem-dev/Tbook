import { FullUserType, UserType } from "@/lib/utils/types/user"
import { MoreInfoType } from "@/lib/utils/types/user.misc/user.misc";
import { FaLock } from "react-icons/fa";
import WebsiteAbout from "./assets/website";
import { SetStateAction } from "react";
import LanguageContact from "./assets/languageContact";
import { MdPerson } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { getStringDate } from "@/lib/utils/simpleUtils";


export default function ContactAbout({userData,view,moreInfo,user,setMoreInfo}:{
    user:UserType|null;
    view?:boolean;
    userData:FullUserType,
    moreInfo:MoreInfoType;
    setMoreInfo:React.Dispatch<SetStateAction<MoreInfoType|undefined>>
}) {
    const {day,month,year} = getStringDate(userData.birthdate)
    return (
        <div className="flex-1 h-full">
            <div className="flex flex-col gap-4 py-4 px-3">
                <h1 className="font-bold text-lg">Contact info</h1>
                <div className="flex justify-between items-center pr-5">
                    <div className="flex items-start gap-4">
                        <div className="">
                            <img className="x1b0d499 xuo83w3" alt="" height="24" width="24" src="https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/vKPF8R4VXuJ.png?_nc_eui2=AeGkgiSarfxtNEmSUKPCpU9-Ix5aY0AQgi0jHlpjQBCCLZdBeUuVCrwWgtzbh2IcNgXAoKl_QSCmD_glm87kvrPc" />
                        </div>
                        <div className="flex flex-col">
                            <p className=" text-black/70 tracking-[0.5px]">{userData.email}</p>
                            <span className="text-sm text-black/70">Email</span>
                        </div>
                        
                    </div>
                    <div className="text-lg text-black/60">
                        <FaLock/>
                    </div>
                </div>
                {moreInfo.website&&<h1 className="font-bold text-lg">Website</h1>}
                <WebsiteAbout websiteInfo={moreInfo.website} user={user} view={view} setMoreInfo={setMoreInfo}/>
                <h1 className="font-bold text-lg">Basic info</h1>
                <LanguageContact languageInfo={moreInfo.language} user={user} view={view} setMoreInfo={setMoreInfo}/>
                <div className="flex justify-between items-center">
                    <div className="flex items-start gap-4">
                        <div className="text-3xl text-black/70">
                            <MdPerson />
                        </div>
                        <div className="flex flex-col">
                            <p className=" text-black/70 tracking-[0.5px] capitalize">{userData.gender}</p>
                            <span className="text-sm text-black/70">Gender</span>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-start gap-4">
                        <div className="text-3xl text-black/70">
                            <FaBirthdayCake />
                        </div>
                        <div className="flex flex-col">
                            <p className=" text-black/70 tracking-[0.5px] capitalize">{month + " " + day}</p>
                            <span className="text-sm text-black/70">Birth date</span>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-start gap-4">
                        <div className="w-[30px]" />
                        <div className="flex flex-col">
                           
                            <p className=" text-black/70 tracking-[0.5px] capitalize">{year}</p>
                            <span className="text-sm text-black/70">Birth year</span>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}