import { useState } from "react"
import ReactDOM from "react-dom"
import { RxCross2 } from "react-icons/rx"

import DarkMode from "./darkMode/darkMode"
import OverlayTemplate from "../../../assets/shared/overlayTemplate"


export default function Display() {
    const [show,setShow] = useState<boolean>(false)
    const [showDark,setShowDark] = useState<boolean>(false)
    
    return (
        <>
            <div className="flex justify-between items-center ">
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg">Display</h2>
                    <p className="text-black/60 text-sm">Dark mode</p>
                </div>
                <button className="bg-gray-300/70 rounded-md p-[0.3rem] px-3 hover:bg-gray-300 transition-all duration-300 active:scale-95" onClick={() => setShow(true)}>View</button>
            </div>
            {show&&
            <OverlayTemplate 
            setShow={setShow}
            title="Display">
                <div className="flex flex-col gap-3 p-4 py-8">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-lg">Dark mode</h3>
                            <p className="text-base text-black/60">Adjust the appearance to reduce glare and give your eyes a break.</p>
                        </div>
                        <button className="bg-gray-300/70 rounded-md p-[0.3rem] px-3 hover:bg-gray-300 transition-all duration-300 active:scale-95" onClick={() => setShowDark(true)}>Off</button>
                    </div>
                    {showDark&&<DarkMode setShowDark={setShowDark}/>}
                </div>
            </OverlayTemplate>}
            
        </>
        
    )
}