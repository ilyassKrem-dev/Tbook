
import { useSize } from "@/lib/utils/hooks"
import { useRouter,usePathname,useSearchParams } from "next/navigation"
import { BsThreeDots } from "react-icons/bs"

import { tabs } from "./tabsNames";
import TabsSm from "./tabs-sm";
export default function ProfileTabs() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {w} = useSize()
    const sk = searchParams.get("sk")
    const handleChangeRoute = (tname:string|null) => {
        if(!tname) {
            return router.push(`${pathname}`)
        }
        return router.push(`${pathname}?sk=${tname}`)
    }

    return (
        <div className="flex justify-between items-center font-semibold text-gray-500 px-2 lg:px-0">
            {w>600?
            <div className="flex items-center gap-3">
                
                {tabs.map((tab,index) => {
                    return (
                        <div key={index} className={` cursor-pointer 
                        ${sk===tab.tab ?
                        "border-b-blue-400 border-b-[3px] text-blue-400" :""}
                          py-1 `} onClick={() => handleChangeRoute(tab.tab)}>
                            <div className="rounded-lg p-3 hover:bg-gray-300/40 active:bg-gray-300/60 transition-all duration-300">
                                {tab.name}
                            </div>
                            
                        </div>
                    )
                })}
            </div>
            :
            <TabsSm handleChangeRoute={handleChangeRoute} sk={sk}/>
            }
            
            <div className="p-2 hover:bg-gray-300/50 rounded-lg active:bg-gray-300 transition-all duration-300 cursor-pointer  flex flex-col items-center justify-center bg-gray-300/70 text-xl text-black px-3 active:scale-90">
                 <BsThreeDots />
            </div>
        </div>
    )
}