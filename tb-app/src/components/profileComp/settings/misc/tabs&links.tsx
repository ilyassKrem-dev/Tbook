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




export const HomeTabs = [
    {
        title:"Blocking",
        desc:"Review people you've previously blocked or add someone to your blocked list.",
        imgSrc:"https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/anqW39IncZR.png",
        link:"/settings/?tab=blocking"
    },
    {
        title:"Info",
        desc:"View your profile informations or change them .",
        imgSrc:"https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/YV2utMU-Nrt.png",
        link:"/settings/?tab=info"
    },
    {
        title:"Dark mode",
        desc:"Choose if you want to use dark mode.",
        imgSrc:"https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/HGA7ZYQ-hFh.png",
        link:"/settings/?tab=accessibility"
    }
]

export const HomeOthers = [
    {
        title:"Posts",
        desc:"Change your posts visibility.",
        imgSrc:"/post.png",
        link:"/settings/?tab=posts"
    }
]