import { useCallback, useState } from "react"
import { FaGlobeAfrica, FaLock, FaUsers } from "react-icons/fa"
import OverlayTemplate from "../../../assets/shared/overlayTemplate"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import SelectOptions from "../../../assets/shared/selectOptions"
import UserPivacy from "@/lib/classes/User.misc/UserPrivacy"



const audienceList = [
    {
        name:"Everyone",
        desc:"Anyone on Tbook",
        icon:<FaGlobeAfrica/>,
        value:"all"
    },
    {
        name:"Friends of friends",
        desc:"Your friends and friends of friends",
        icon:<FaUsers/>,
        value:"fff"
    },{
        name:"No one",
        desc:"",
        icon:<FaLock/>,
        value:"me"
    }
]
export default function SearchContact({searchPr}:{
    searchPr:"all"|'fff'|"me"
}) {   
    const [show,setShow] = useState<boolean>(false)
    const [original,setOriginal] = useState<"all"|'fff'|"me">(searchPr) 
    const [choise,setChoise] = useState<"all"|'fff'|"me">(original)
    const {user} = loginInfo()
    const handleChange = useCallback(async() => {
        if(!user || choise === original) return setShow(false)
        const res =await new UserPivacy(user.id).updateSearchView(choise)
        if(res?.success) {
            setOriginal(choise)
            setShow(false)
        }
    },[user,original,choise])
    return (
        <div className="bg-white mt-5 rounded-lg p-3">
            <h2 className="text-xl font-bold">Search</h2>
            <div className="mt-4 flex justify-between items-center gap-2">
                <div className="flex flex-col">
                    <h3 className="max-w-[400px] font-semibold">Who can find you  through search in Tbook?</h3>
                    <p className="max-w-[500px] break-words text-black/70 text-sm">you can control who can find you through search by choosing whether everyone, only your connections, or no one can discover your profile. This helps manage your privacy and visibility on the platform</p>
                </div>
                <div className="p-[0.3rem] px-3 flex gap-1 items-center bg-gray-300/70 font-semibold text-sm rounded-md cursor-pointer hover:bg-gray-300 active:scale-95 transition-all duration-300 text-black/70" onClick={() => setShow(true)}>
                    <div className="text-lg ">
                        
                        {original==="all"&&<FaGlobeAfrica/>}
                        {original==="fff"&&<FaUsers/>}
                        {original==="me"&&<FaLock/>}
                    </div>
                    <span className="w-fit max-w-[100px] cursor-pointer  truncate">
                        {original==="all"&&"Everyone"}
                        {original==="fff"&&"Friends and their friends"}
                        {original==="me"&&"No one"}
                    </span>
                </div>
            </div>
            {show&&<OverlayTemplate setShow={setShow} title="Select audience">
                <div className="p-4 py-6 flex flex-col gap-1">
                    {audienceList.map((audience,index) => {
                        const {value,name,desc,icon} = audience
                        return (
                            <SelectOptions 
                            key={index}
                            value={value}
                            chosed={choise}
                            setChosen={setChoise}
                            name={name}
                            desc={desc}
                            icon={icon}
                            />
                        )
                    })}
                </div>
                <div className="p-3 py-4 border-t rounded-b-lg flex justify-end gap-6 items-center">
                    <div className="text-blue-500 font-medium p-[0.35rem]  rounded-lg hover:bg-black/10 transition-all duration-300 cursor-pointer" onClick={() => setShow(false)}>
                        Cancel
                    </div>
                    <button className=" font-medium bg-blue-500 p-[0.35rem] rounded-lg text-white px-10 hover:bg-blue-700 transition-all duration-300 active:scale-95" onClick={handleChange}>{choise === original ? "Done":"Save"}</button>
                </div>
            </OverlayTemplate>}
        </div>
    )
}