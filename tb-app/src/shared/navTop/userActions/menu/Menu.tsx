import { useRemoveOverlay } from "@/lib/utils/hooks";
import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { tabs } from "@/components/home/leftTabs/tabs";
import Link from "next/link";




export default function Menu() {
    const [show,setShow] = useState<boolean>(false)

    useRemoveOverlay(
        {
            tab:".menu",
            setShow
        }
    )
    return (
        <div className="relative flex justify-center items-center menu">
            <button className="h-full rounded-full p-2 text-2xl bg-white-1  hover:bg-gray-300 cursor-pointer relative  active:scale-90" onClick={() => setShow(prev => !prev)}>
                <CgMenuGridR />
            </button>
            {show&&<div className="absolute top-12">
                <div className="bg-white rounded-lg flex flex-col p-1 px-2 w-[200px] gap-1 shadow-lg border border-black/10">
                    {tabs.map((tab,index) => {
                        const {name,icon,link} = tab
                        return (
                            <Link href={link} key={index} className="flex gap-2 items-center  p-2 rounded-md hover:bg-gray-300/70 transition-all duration-300 active:scale-95">
                                <div className="text-2xl">
                                    {icon}
                                </div>
                                <p className=" cursor-pointer text-base font-semibold">
                                    {name}
                                </p>
                            </Link>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}