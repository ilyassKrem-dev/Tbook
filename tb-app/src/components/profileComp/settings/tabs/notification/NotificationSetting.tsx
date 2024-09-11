import { useCallback, useState } from "react"
import { FaUserFriends } from "react-icons/fa";
import { BsFilePostFill } from "react-icons/bs";
import OverlayTemplate from "../../assets/shared/overlayTemplate";
import SelectOptions from "../../assets/shared/selectOptions";
import { IoIosNotifications } from "react-icons/io";
import UserPivacy from "@/lib/classes/User.misc/UserPrivacy";
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
const notifiIcons = [
    {
        name:"All",
        desc:"",
        icon:<IoIosNotifications />,
        value:"all"
    },
    {
        name:"Requests",
        desc:"Friend Requests only",
        icon:<FaUserFriends />,
        value:"requests"
    },
    {
        name:"Posts",
        desc:"Posts only",
        icon:<BsFilePostFill />,
        value:"posts"
    }
]

type NotificationsType = "all"|"requests"|"posts"
export default function NotificationSetting({notifi}:{
    notifi:NotificationsType
}) {
    const [original,setOriginal] = useState<NotificationsType>(notifi)
    const [chosen,setChosen] = useState<NotificationsType>(original)
    const [show,setShow] = useState<boolean>(false)
    const {user} = loginInfo()
    const handleChange = useCallback(async() => {
        if(!user || original===chosen) return setShow(false)
        const res = await new UserPivacy(user.id).updateNotifications(chosen)
        if(res?.success) {
            setOriginal(chosen)
            setShow(false)
        }
    },[chosen,original,user])
    return (
        <div className="p-5 lg:p-8 bg-gray-1">
            <h1 className="font-bold text-xl">Notifications settings</h1>
            <div className="bg-white p-4 mt-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg">What Notifications You want to Receive?</h3>
                    </div>
                    <button className="bg-gray-300/70 px-4 p-[0.35rem] font-semibold text-base rounded-lg flex gap-1 items-center hover:bg-gray-300 active:scale-95 transition-all duration-300 min-w-[80px]" onClick={() => setShow(true)}> 
                        <div className="text-lg">
                            {original==="requests"&&<FaUserFriends/>}
                            {original==="all"&&<IoIosNotifications/>}
                            {original==="posts"&&<BsFilePostFill/>}
                        </div>
                        <span className="text-sm max-w-[100px] truncate font-semibold cursor-pointer">
                            {original==="requests"&&"Requests"}
                            {original==="all"&&"All"}
                            {original==="posts"&&"Posts"}
                        </span>
                    </button>
                </div>
                {show&&<OverlayTemplate setShow={setShow} title="Notifications">
                    <div className="p-4 py-6 flex flex-col gap-1">
                        {notifiIcons.map((noti,index) => {
                            const {value,name,desc,icon} = noti
                            return (
                                <SelectOptions 
                                key={index}
                                setChosen={setChosen}
                                icon={icon}
                                desc={desc}
                                name={name}
                                value={value}
                                chosed={chosen}
                                />
                            )
                        })}
                    </div>
                    <div className="p-3 py-4 border-t rounded-b-lg flex justify-end gap-6 items-center">
                        <div className="text-blue-500 font-medium p-[0.35rem]  rounded-lg hover:bg-black/10 transition-all duration-300 cursor-pointer" onClick={() => setShow(false)}>
                            Cancel
                        </div>
                        <button className=" font-medium bg-blue-500 p-[0.35rem] rounded-lg text-white px-10 hover:bg-blue-700 transition-all duration-300 active:scale-95" onClick={handleChange}>{chosen === original ? "Done":"Save"}</button>
                    </div>
                </OverlayTemplate>}
            </div>
        </div>
    )
}