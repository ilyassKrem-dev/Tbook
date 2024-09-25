
import { BsFillPeopleFill } from "react-icons/bs";
import { SiStorybook } from "react-icons/si";

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
        name:"Stories",
        icon:<SiStorybook  className="text-blue-400"/>,
        link:"/stories"
    }
] as TabTypes[]

