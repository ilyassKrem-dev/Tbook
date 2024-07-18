import { FaGlobeAfrica } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

export default function SetPostWatch({profileImage,profileName}:{
    profileImage:string|null;
    profileName:string
}) {

    return (
        <>
            <div className="flex gap-3 p-2 px-4 items-center">
                <div className="w-[40px] h-[40px] rounded-full">
                    <img 
                    src={profileImage ? profileImage : "/profile.jpg"} 
                    alt={`${profileName} image`}
                    className="rounded-full w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold capitalize">{profileName}</h2>
                    <button className="flex gap-1 items-center text-xs  p-[0.15rem] rounded-md  px-2 bg-gray-300/60 font-semibold">
                        <FaGlobeAfrica />
                        <p className="max-w-[150px] truncate cursor-pointer">Public</p>
                        
                        <MdArrowDropDown className="text-xl"/>
                    </button>
                </div> 
            </div>
        </>
    )
}