import { IoSearch } from "react-icons/io5";
import { TabsAndLinks } from "../../../misc/tabs&links";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";



export default function SettingSearch() {
    const tabsList = TabsAndLinks.map(tab=>tab.tabs).flat()
    const [tabs,setTabs] = useState<any[]>([])
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
        if(!value) return setTabs([])
        setTabs(tabsList.filter(tab=>tab.name.toLowerCase().startsWith(value)))
    }
    return (
        <div className="relative">
            <div className="relative flex justify-center items-center">
                <input type="text" className="h-[40px] rounded-full bg-black/5 px-8 placeholder:text-base focus-within:outline-none border-0" placeholder="Search settings" name="setting-search" onChange={handleSearch}/>
                <div className="absolute left-2 text-lg">
                    <IoSearch />
                </div>
                <div className="absolute right-1 text-lg cursor-pointer p-2 rounded-full hover:bg-gray-300/60 transition-all duration-300" onClick={() => setTabs([])}>
                    <RxCross2 />
                </div>
            </div>
            <div className="absolute w-full g-white rounded-lg bg-white top-[3rem] overflow-y-auto custom-scrollbar max-h-[350px] flex flex-col gap-2 border border-black/10">
                {tabs.map((tab,index) => {
                    const {icon,link,name} = tab
                    return (
                        <Link href={`/profile${link}`} key={index} className="flex gap-2 p-2 rounded-md hover:bg-black/5 items-center cursor-pointer">
                            <div className="text-2xl">
                                {icon}
                            </div>
                            <p className="text-lg font-[500] cursor-pointer">{name}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}