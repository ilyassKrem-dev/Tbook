
import { TiWorld } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";




export const radiosAndIcons = [
    {
        name:"friends",
        icon:<FaUserFriends />,
        desc:"Your friends on Tbook",
        value:"friends"
    },
    {
        name:"public",
        icon:<TiWorld />,
        desc:"Anyone on Tbook",
        value:"public"

    },{
        name:"only me",
        icon:<IoLockClosed/>,
        desc:"",
        value:"me"
    }
]