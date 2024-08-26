
import { useSize } from "@/lib/utils/hooks"
import SettingsLeftSide from "./assets/leftSide/settLeftSide"
import SettingsHome from "./settingsHome"
import { useSearchParams } from "next/navigation"
import SettingsTabs from "./tabs/settingsTabs"
import { TabsAndLinks } from "./misc/tabs&links"
export default function Settings() {
    const {w}  = useSize()
    const tabsList = TabsAndLinks.map(tab => tab.tabs).flat()
    const tabs = tabsList.map(tab=>tab.link.split("=")[1]).filter(tab=>tab)
    const searchParams = useSearchParams()
    const tabString = searchParams?.get("tab")
    return (
        <>
            <div className="flex pt-12 h-screen">
                <div className="md:w-[400px] h-full ">
                    {(w<=767&&!tabString||w>767)&&<SettingsLeftSide />}
                </div>
                <div className="flex-1">
                    {!tabs.includes(tabString ?? "")&&w>767&&<SettingsHome />}
                    {tabString&&tabs.includes(tabString)&&<SettingsTabs tab={tabString}/>}
                </div>
            </div>
        
        </>
    )
}