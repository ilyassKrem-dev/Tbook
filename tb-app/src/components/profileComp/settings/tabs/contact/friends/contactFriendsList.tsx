import { useCallback, useState } from "react"
import { FaGlobeAfrica, FaUsers,FaUserFriends,FaLock   } from "react-icons/fa"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper"
import OverlayTemplate from "../../../assets/shared/overlayTemplate"
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
        desc:"Your friends of friends",
        icon:<FaUsers/>,
        value:"fff"
    },{
        name:"Friends",
        desc:"Your friends in Tbook",
        icon:<FaUserFriends />,
        value:"friends"
    },{
        name:"Only me",
        desc:"",
        icon:<FaLock/>,
        value:"me"
    }
]


export default function ContactFriendsList({friendsList}:{
    friendsList:"all"|"fff"|"friends"|"me"
}) {
    const [original,setOriginal] = useState<"all"|"me"|"fff"|"friends">(friendsList)
    const [choise,setChoise] = useState<"all"|"me"|"fff"|"friends">(original)
    const [show,setShow] = useState<boolean>(false)
    const {user} = loginInfo()
    const handleChange = useCallback(async() => {
        if(!user||choise === original) return setShow(false)
        const res = await new UserPivacy(user.id).updateFriendsListView(choise)
        if(res?.success) {
            setOriginal(choise)
            setShow(false)
        }
    },[user,original,choise])
    return (
        <>
            <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Who can see your friends list?</h3>
                        <p className="text-sm text-black/70 break-words max-w-[600px]">Remember, your friends control who can see their friendships on their own Timelines. If people can see your friendship on another timeline, they'll be able to see it in News Feed, search and other places on Facebook. If you set this to Only me, only you will be able to see your full friends list on your timeline. Other people will see only mutual friends.</p>
                    </div>
                    <div className="bg-gray-300/70 p-[0.3rem] px-4 rounded-md  flex gap-1 items-center  cursor-pointer hover:bg-gray-300 transition-all duration-300 active:scale-95" onClick={() => setShow(true)}>
                        <div className="text-lg text-black/70 flex-1">
                            {original==="all"&&<FaGlobeAfrica/>}
                            {original==="fff"&&<FaUsers />}
                            {original==="friends"&&<FaUserFriends/>}
                            {original==="me"&&<FaLock/>}
                        </div>
                        <span className=" max-w-[100px] truncate font-semibold text-sm cursor-pointer">
                            {original==="all"&&"Everyone"}
                            {original==="fff"&&"Friends of friends"}
                            {original==="friends"&&"Friends"}
                            {original==="me"&&"Only me"}
                            </span>
                    </div>
                    {show&&<OverlayTemplate 
                    setShow={setShow} 
                    title="Select audience"
                    >
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
        </>
    )
}