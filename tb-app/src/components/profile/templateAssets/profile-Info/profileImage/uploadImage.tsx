import { SetStateAction, useState } from "react";
import { TfiUpload } from "react-icons/tfi";
import UploadOverlay from "./uploadOverlay";

export default function UploadImage({userId,setProfileImg}:{
    userId:string|undefined;
    setProfileImg:React.Dispatch<SetStateAction<string|null>>
}) {
    const [show,setShow] = useState<boolean>(false)
    
    return (
        <>
            <div className="absolute -bottom-[3rem] bg-white rounded-lg p-2 font-semibold w-[250px] shadow-[0px_0px_3px_1px_rgba(1,2,3,0.4)]">
                    <div className="flex items-center gap-2 p-2 transition-all duration-300 rounded-md hover:bg-gray-300/30 active:bg-gray-300/60 cursor-pointer" onClick={() => setShow(true)}>
                        <TfiUpload className="text-xl" />
                        <p className="cursor-pointer">Upload photo</p>
                    </div>
            </div>
            {show&&<UploadOverlay setShow={setShow} userId={userId} setProfileImg={setProfileImg}/>}
        </>
    )
}