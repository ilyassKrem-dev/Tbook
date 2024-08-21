import { useRef, useState } from "react";
import { TabsAndLinks } from "../../misc/tabs&links";
import Link from "next/link";
import SettingSearch from "./search/settingsSearch";


export default function SettingsLeftSide() {
    const [scrolled,setScrolled] = useState<boolean>(false)
    const scrollDiv = useRef<HTMLDivElement>(null)
    const handleScroll = () => {
        const current = scrollDiv.current
        if(!current) return
        const toTop = current.scrollTop
        if(toTop === 0) return setScrolled(false)
        setScrolled(true)
    }

    return (
        <div className="fixed top-14 bottom-0 bg-white border-r border-r-black/20 w-[400px] left-0 right-0">
            <div className="p-3 flex flex-col h-full">
                <div className={`flex flex-col gap-3 mt-4  pb-4 border-black/30 ${scrolled?"border-b":""}`}>
                    <h1 className="font-[800] text-2xl">Settings & privacy</h1>
                    <SettingSearch />
                </div>
                <div ref={scrollDiv} className="flex-1 overflow-y-auto flex flex-col gap-2 custom-scrollbar" onScroll={handleScroll}>
                    {TabsAndLinks.map((tab,index) => {
                        const {title,desc,tabs} = tab
                        return (
                            <div key={index} className={` flex flex-col gap-4  pb-2 ${index!==TabsAndLinks.length-1?"border-b border-black/20" :""}`}>
                                <div className="flex flex-col">
                                    <h1 className="text-xl font-bold">{title}</h1>
                                    <p className="font-semibold text-gray-500 text-sm">{desc}</p>
                                </div>
                                <div className="flex flex-col">
                                    {tabs.map((tab2,index) => {
                                        const {icon,link,name} = tab2
                                        return (
                                        <Link href={`/profile${link}`} key={index} className="p-2  flex text-lg gap-4 rounded-md hover:bg-black/5 items-center transition-all duration-300 active:scale-95 cursor-pointer">
                                            <div className="text-2xl">
                                                {icon}
                                            </div>
                                            <p className="font-[500] cursor-pointer">{name}</p>
                                        </Link>
                                        )
                                    })}
                                    
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>
    )
}