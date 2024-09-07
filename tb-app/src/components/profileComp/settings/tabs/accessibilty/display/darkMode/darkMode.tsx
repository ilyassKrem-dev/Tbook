import { SetStateAction, useState } from "react"
import OverlayTemplate from "@/components/profileComp/settings/assets/shared/overlayTemplate"
type DarkChoicesType = {
    name:string,
    value:"off"|"on"|'auto',
    desc:string
}
const darkModeChoices:DarkChoicesType[] = [
    {
        name:"off",
        value:"off",
        desc:""
    },
    {
        name:"on",
        value:"on",
        desc:""
    },
    {
        name:"Automatic",
        value:"auto",
        desc:"We'll automaticly adjust the display based on your device's system settings"
    }
]


export default function DarkMode({setShowDark}:{
    setShowDark:React.Dispatch<SetStateAction<boolean>>
}) {

    const [chosen,setChosen] = useState<"off"|'on'|'auto'>("off")
    return (
        <>
            <OverlayTemplate 
            setShow={setShowDark} 
            title="Dark mode"
            moreLight>
                <p className=" text-lg font-bold underline text-center w-full">Dark mode later</p>
                <div className="flex p-6 py-8 flex-col gap-2">
                    {darkModeChoices.map((choice,index) => {
                        const {value,name,desc} = choice
                        const ifSelected = chosen===value
                        return (
                            <div 
                            key={index} 
                            className="flex justify-between items-center hover:bg-gray-300/50 transition-all duration-300 rounded-md p-1 px-2 cursor-pointer"
                            onClick={() => setChosen(value)}>
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-lg capitalize w-fit cursor-pointer">{name}</h3>
                                    <p className="text-base text-black/60 cursor-pointer">{desc}</p>
                                </div>
                                <div className={`rounded-full border p-[0.2rem] ${ifSelected?"border-blue-500":"" }`}>
                                    <div className={` rounded-full  p-[0.4rem] ${ifSelected?"bg-blue-500":""}`} />
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </OverlayTemplate>
            
        </>
    )
}