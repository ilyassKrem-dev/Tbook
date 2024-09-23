import { ChangeEvent, SetStateAction } from "react";
import { IoText } from "react-icons/io5";
import { MdPhotoLibrary } from "react-icons/md";




export default function SelectStory({setStory,setPhotoStory}:{
    setStory:React.Dispatch<SetStateAction<"text"|"photo"|undefined>>;
    setPhotoStory:React.Dispatch<SetStateAction<{
        media:string;
        file:File[];
        class:{
            scale:number;
            rotate:number
        }
    }>>
}) {
    const handleClick = (e:ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length>0) {
            const fileReader = new FileReader()
            const file = files[0];
            if(!file.type.includes("image")) return
            fileReader.onload = (e) => {
                const image = e.target?.result?.toString();
                setPhotoStory((prev:any) => ({
                    ...prev,
                    media:image,
                    file:file
                }))
            }
            setStory("photo")
            fileReader.readAsDataURL(file)

        }
    }
    return (
        <div className="flex justify-center items-center h-full flex-1 gap-3">
            <>
                <label htmlFor="photo-story" className="h-[300px] flex justify-center items-center bg-gradient-to-b from-blue-500 via-violet-500 to-blue-200 rounded-md w-[200px]  flex-col gap-2 cursor-pointer active:scale-95 group relative">
                    <div  className="rounded-full  text-2xl bg-white p-3">
                        <MdPhotoLibrary />
                    </div>
                    <p className="text-sm font-bold text-white cursor-pointer">Create a photo story</p>
                    <div className="absolute top-0 right-0 left-0 bottom-0 group-hover:bg-black/20 rounded-md transition-all duration-300 group-active:bg-black/40" />

                </label>
                <input type="file" accept="image/*" id="photo-story" className="hidden" onChange={handleClick} />
            </>
            <div className="h-[300px] flex justify-center items-center bg-gradient-to-b from-violet-500 via-purple-400 to-purple-500 rounded-md w-[200px]  flex-col gap-2 cursor-pointer active:scale-95 group relative" onClick={() => setStory("text")}>
                <div  className="rounded-full  text-2xl bg-white p-3">
                    <IoText />
                </div>
                <p className="text-sm font-bold text-white cursor-pointer">Create a text story</p>
                <div className="absolute top-0 right-0 left-0 bottom-0 group-hover:bg-black/20 rounded-md transition-all duration-300 group-active:bg-black/40" />

            </div>
        </div>
    )
}