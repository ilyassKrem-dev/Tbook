import UserInfo from "@/lib/classes/User.misc/UserInfo";
import TabArrow from "@/shared/Ui/tabArrow"
import { SetStateAction } from "react"
import { MdOutlineEdit } from "react-icons/md"
import { MdDeleteOutline } from "react-icons/md";





export default function SharedBtn({setEdit,setShow,value,text,setValue,type,userId}:{
    setEdit:React.Dispatch<SetStateAction<boolean>>;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    value:string|null;
    text:string;
    setValue:React.Dispatch<SetStateAction<string|null>>;
    userId:string;
    type:string
}) {

    const handleDelete = async() => {
        const res = await UserInfo.deleteInfo(userId,type)
        if(res?.success) {
            setValue("")
            setShow(false)
        }
    }
    return (
        <>
            <div className="absolute right-3 top-10 z-20">
                <TabArrow />
            </div>     
            <div className="absolute top-12 right-3 z-20">
                <div className="relative rounded-lg">
                    <div className="bg-white p-1 w-[300px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.34)] rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 hover:bg-gray-300/40 transition-all duration-300 cursor-pointer rounded-md p-1 active:scale-95" onClick={() => {
                            setEdit(true)
                            setShow(false)
                        }}>
                            <div className="text-xl">
                                <MdOutlineEdit />
                            </div>
                            <p className="font-semibold cursor-pointer">{value?`Edit  ${text}`:`Add ${text}`}</p>
                        </div>
                        {value&&<div className="flex items-center gap-2 hover:bg-gray-300/40 transition-all duration-300 cursor-pointer rounded-md p-1 active:scale-95" onClick={handleDelete}>
                            <div className="text-xl">
                                <MdDeleteOutline />
                            </div>
                            <p className="font-semibold cursor-pointer" >Delete {text}</p>
                        </div>}
                    </div>
                    
                </div>
            </div>
        
        </>
    )
}