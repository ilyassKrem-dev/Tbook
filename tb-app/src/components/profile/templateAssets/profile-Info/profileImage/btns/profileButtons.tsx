
import { RiArrowUpSLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

export default function ProfileButtons() {

    return (
        <>
            <div className="flex items-end gap-3 pb-6">
                <button className="flex items-center gap-2 font-semibold bg-gray-300/60 rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]" >
                    <MdEdit  className="text-xl"/>
                    Edit profile
                </button>
                <button className="flex items-center gap-2 font-semibold bg-gray-300/60 rounded-lg p-2 px-3 hover-opacity cursor-pointer active:scale-90 h-[40px]" >
                    <RiArrowUpSLine  className="text-xl rotate-180"/>
                </button>
            </div>
        </>
    )
}