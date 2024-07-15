
import { BsFillPeopleFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { SiHomeassistantcommunitystore } from "react-icons/si";

type TabTypes = {
    name:string;
    icon:any;
    link:string
}

export const tabs = [
    {
        name:"Find friends",
        icon:<BsFillPeopleFill  className="text-blue-400"/>,
        link:"/friends"
    },
    {
        name:"Groups",
        icon:<TiGroup  className="text-blue-400"/>,
        link:"/groups"
    },
    ,
    {
        name:"Marketplace",
        icon:<SiHomeassistantcommunitystore  className="text-blue-400"/>,
        link:"/marketplace"
    }
] as TabTypes[]

