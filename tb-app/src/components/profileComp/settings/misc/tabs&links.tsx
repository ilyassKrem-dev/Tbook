import { MdOutlineAddReaction } from "react-icons/md";
import { PiBellRinging } from "react-icons/pi";
import { RxAccessibility } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiUserSearchLine } from "react-icons/ri";
import { BsFilePost } from "react-icons/bs";
import { RiUserForbidLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";



export const TabsAndLinks = [
    {
        title:"Preferences",
        desc:"Customize your experience on Facebook.",
        tabs:[
            {
                icon:<MdOutlineAddReaction />,
                name:"Reaction preferences",
                link:"/settings/?tab=reaction"
            },
            {
                icon:<PiBellRinging />,
                name:"Notifications",
                link:"/settings/?tab=notifications"
            },
            {
                icon:<RxAccessibility />,
                name:"Accessibility",
                link:"/settings/?tab=accessibility"
            }
        ]
    },
    {
        title:"Audience and visibility",
        desc:"Control who can see what you share on Facebook.",
        tabs:[
            {
                icon:<HiOutlineUserCircle />,
                name:"Profile details",
                link:"/"
            },
            {
                icon:<RiUserSearchLine />,
                name:"How people find and contact you",
                link:"/settings/?tab=contact"
            },
            {
                icon:<BsFilePost />,
                name:"Posts",
                link:"/settings/?tab=posts"
            },
            {
                icon:<RiUserForbidLine  />,
                name:"Blocking",
                link:"/settings/?tab=blocking"
            }
        ]
    },
    {
        title:"Your information",
        desc:"Manage your Tbook information.",
        tabs:[
            {
                icon:<ImProfile />,
                name:"Access your information",
                link:"/settings/?tab=info"
            }
        ]
    }
]