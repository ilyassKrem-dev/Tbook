import { SetStateAction } from "react";





export default function SelectOptions({chosed,setChosen,desc,name,value,icon}:{
    chosed:any;
    setChosen:React.Dispatch<SetStateAction<any>>;
    desc:string,
    name:string;
    value:any;
    icon:any
}) {
    const ifSelected = chosed===value
    return (
        <div className="p-2 flex items-center hover:bg-gray-300/40 rounded-md transition-all duration-300 cursor-pointer gap-1 justify-between" onClick={() => setChosen(value)} role="radio" aria-checked={ifSelected}>
            <div className="flex items-center gap-3">
                <div className="text-2xl bg-gray-300/70 p-4 rounded-full">
                    {icon}
                </div>
                <div className="">
                    <h4 className="font-semibold cursor-pointer w-full capitalize">{name}</h4>
                    <p className="text-sm text-black/70 break-words cursor-pointer">{desc}</p>
                </div>  

            </div>
            <div className={`rounded-full p-1   ${ifSelected?"border-blue-500 border-2":"border-black/70 border"}`}>
                {ifSelected?
                <div className="bg-blue-500 p-[0.35rem] rounded-full" />
                :
                <div className="p-[0.35rem] bg-white"/>}

            </div>
        </div>
    )
}