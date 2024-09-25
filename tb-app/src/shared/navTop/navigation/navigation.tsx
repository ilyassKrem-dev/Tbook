import { GoHome,GoHomeFill  } from "react-icons/go";
import { IoPeopleOutline,IoPeopleSharp  } from "react-icons/io5";
import { RiShoppingBagFill,RiShoppingBagLine  } from "react-icons/ri";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navs = [
    {
        icon:<GoHome className="text-black/60"/>,
        fillIcon:<GoHomeFill className="text-blue-500"/>,
        path:"/",
        name:"Home"

    },
    {
        icon:<IoPeopleOutline className="text-black/60"/>,
        fillIcon:<IoPeopleSharp className="text-blue-500"/>,
        path:"/friends",
        name:"Friends"

    }
]
export default function Navigation() {
    const pathname = usePathname()
    return (
        <div className="">
            <div className="flex items-center gap-2">
                {navs.map((nav,index) => {
                    const path = "/"+pathname?.split("/")[1] === nav.path
                    return (
                        <Link key={index} href={nav.path} className={`py-1  ${path?"border-b-blue-500 border-b-4":""} relative group flex justify-center items-center`}>
                            <div className={`text-2xl py-3 px-10 hover:bg-gray-1 rounded-lg transition-all duration-300 active:bg-gray-300`}>
                                {path?nav.fillIcon:nav.icon}
                            </div>
                            <div className="absolute -bottom-10 text-sm bg-dark rounded-lg text-white p-1 opacity-80 px-2 hidden group-hover:block transition-all duration-300">
                                {nav.name}
                            </div>
                        </Link>
                    )
                })}
               
            </div>
        </div>
    )
}