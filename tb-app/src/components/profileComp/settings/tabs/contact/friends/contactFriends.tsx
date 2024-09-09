
import { useCallback, useState } from "react";
import { FaGlobeAfrica } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import OverlayTemplate from "../../../assets/shared/overlayTemplate";
import SelectOptions from "../../../assets/shared/selectOptions";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import UserPivacy from "@/lib/classes/User.misc/UserPrivacy";
const audienceList = [
    {
        name:"Everyone",
        desc:"Anyone on Tbook",
        icon:<FaGlobeAfrica/>,
        value:"all"
    },
    {
        name:"Friends of friends",
        desc:"Your friends of friends",
        icon:<FaUsers/>,
        value:"fff"
    }
]

export default function ContactFriends({reqSend}:{
    reqSend:"all"|"fff"
}) {
    const [original,setOriginal] = useState<"all"|"fff">(reqSend)
    const [requests,setRequests] = useState<"all"|"fff">(original)
    const {user} = loginInfo()
    const [show,setShow] = useState<boolean>(false)
    const handleSave = useCallback(async() => {
        if(!user || requests === original)return setShow(false)
        const res = await new UserPivacy(user.id).updateRequestsPrivacy(requests)
        if(res?.success) {
            setOriginal(requests)
            setShow(false)
        }
    },[user,requests,original])
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="font-medium text-[1rem]">Who can send you friend requests?</h3>
                </div>
                <div className="flex gap-1 items-center bg-gray-300/50 rounded-md p-2 px-3 cursor-pointer hover:bg-gray-300/80 active:scale-95 active:outline active:outline-blue-500 transition-all duration-300" onClick={() => setShow(true)}>
                    <div className="text-lg text-black/80 flex-1">
                        {original==="all"&&<FaGlobeAfrica/>}
                        {original==="fff"&&<FaUsers/>}
                    </div>
                    <p className="text-sm truncate max-w-[80px] sm:max-w-[120px] cursor-pointer font-semibold">
                        {original==="all"?"Everyone":"Friends of friends"}
                    </p>
                </div>
            </div>
           
           
            {show&&
            <OverlayTemplate 
            setShow={setShow} 
            title="Select audience
            ">
                <div className="p-4 py-6 flex flex-col gap-1">
                    {audienceList.map((audi,index) => {
                        const {value,name,desc,icon} = audi
                        return (
                            <SelectOptions
                            key={index} 
                            value={value}
                            name={name}
                            desc={desc}
                            icon={icon}
                            setChosen={setRequests}
                            chosed={requests}
                            />
                        )
                    })}
                </div>
                <div className="p-3 py-4 border-t rounded-b-lg flex justify-end gap-6 items-center">
                    <div className="text-blue-500 font-medium p-[0.35rem]  rounded-lg hover:bg-black/10 transition-all duration-300 cursor-pointer" onClick={() => setShow(false)}>
                        Cancel
                    </div>
                    <button className=" font-medium bg-blue-500 p-[0.35rem] rounded-lg text-white px-10 hover:bg-blue-700 transition-all duration-300 active:scale-95" onClick={handleSave}>{requests === original ? "Done":"Save"}</button>
                </div>
            </OverlayTemplate>}
        </>
       
    )
}