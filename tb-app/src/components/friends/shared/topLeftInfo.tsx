import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa6"
import BurgerCross from "./burgerCross"
import { SetStateAction } from "react"




export  function LeftTopInfoLg({tab}:{
    tab:"all"|"suggestion"|"requests"
}) {
   
    return (
        <div className={`flex items-center gap-4  ${tab==="all"?"border-b border-black/30":" "}`}>
            <Link href={"/friends/"} className="text-xl text-black/60 hover:bg-gray-300/60 p-2 transition-all duration-300 rounded-full active:scale-95">
                <FaArrowLeft />
            </Link>
            <div>
                <span className="text-black/50 text-sm">Friend</span>
                <h1 className="text-2xl font-bold">
                    {tab==="all"?
                    "All friends":
                    tab==="suggestion"?
                    "Suggestion":
                    "Friend Requests"}
                </h1>
            </div> 
        </div>
    )
    
    
}


export  function LeftTopInfoSm({tab,show,setShow}:{
    tab:"all"|"suggestion"|"requests";
    show:boolean;
    setShow:React.Dispatch<SetStateAction<boolean>>;
}) {
   
    return (
        <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <Link href={"/friends/"} className="text-xl text-black/60 hover:bg-gray-300/60 p-2 transition-all duration-300 rounded-full active:scale-95">
                    <FaArrowLeft />
                </Link>
                <div className="flex items-center gap-1">
                    <h1 className="text-xl md:text-2xl font-bold">
                        {tab==="all"?
                        "All friends":
                        tab==="suggestion"?
                        "Suggestion":
                        "Friend Requests"}
                    </h1>
                    <span className="text-black/50 text-sm mt-1">/ Friend</span>
                </div>

            </div>  
            <BurgerCross setShow={setShow} show={show}/>
        </div>
    )
    
    
}