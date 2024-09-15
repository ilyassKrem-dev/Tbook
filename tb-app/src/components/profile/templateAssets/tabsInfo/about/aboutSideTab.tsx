import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const aboutTabs = [
    {
        name:"Overview",
        link:"about_overview",
        value:"overview",
        variant:undefined
    },
    {
        name:"Place lived",
        link:"about_place",
        value:"place",
        variant:""
    },
    {
        name:"Contact",
        link:"about_contact",
        value:"contact",
        variant:""
    }
]
type AboutNavTabsType = {
    name:string;
    link:string;
    value:string;
    variant:string|undefined
}

export default function AboutSideTabs({aboutTab}:{
    aboutTab:string
}) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [newTabs,setNewTabs] = useState<AboutNavTabsType[]>(aboutTabs)
    useEffect(() => {
        //@ts-ignore
        const queries = new URLSearchParams(Array.from(searchParams.entries()))
        setNewTabs(prev => {
            const newData = newTabs.map(tab=>{ 
                queries.set("sk",tab.link)
                return {...tab,link:`${pathname}?${queries.toString()}`}
            })
            return newData
        })
    },[])
    return (
        <div className="md:w-[280px] border-b md:border-b-0 md:border-r border-black/20  p-2 py-4 h-fit">
            <h1 className="text-xl font-bold mb-5 px-2">About</h1>
            <div className="flex flex-col gap-2">
                {newTabs.map((tab,index) => { 
                    const {value,link,name,variant} = tab
                    return (
                        <Link 
                        href={link} 
                        scroll={false}
                        key={index} className={`p-[0.3rem] hover:bg-gray-300/40 transition-all duration-300 active:scale-95 cursor-pointer rounded-md font-semibold ${aboutTab===value || aboutTab===variant?"bg-blue-100 text-blue-500":"text-black/60"} px-2 w-full`}>
                            <p className="cursor-pointer">{name}</p>
                        </Link>
                    )
                })}
                    
            </div>
        </div>
    )
}