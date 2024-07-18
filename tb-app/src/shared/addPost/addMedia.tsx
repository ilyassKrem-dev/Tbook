import { ChangeEvent, SetStateAction } from "react";
import { IoMdPhotos } from "react-icons/io";
import { nanoid } from "nanoid";
type MediaType = {
    id:string;
    file:File;
    media:string
    type:"image"|"video"|"audio"
}

export default function AddMedia({setMedias}:{
    setMedias:React.Dispatch<SetStateAction<MediaType[]>>
}) {
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const files = e.target.files
        if(files && files.length>0) {
            const arrFiles = Array.from(files)
            const handleFiles = (files:File[]) => {
                if(files.length ===0) return
                const file = files.shift()
                const fileReader = new FileReader()
                fileReader.onload = (e) => {
                    if(file) {
                        if(file.type.includes('image')) {
                           setMedias(prev => {
                            return [...prev,
                                {file:file,
                                media:fileReader.result as string,type:"image",
                                id:nanoid()
                                }]
                           })
                        }
                        else if(file.type.includes('audio')) {
                            setMedias(prev => {
                                return [...prev,
                                    {file:file,
                                    media:fileReader.result as string,type:"audio",
                                    id:nanoid()
                                }]
                            })
                        }
                        else if (file.type.includes('video')) {
                            setMedias(prev => {
                                return [...prev,
                                    {file:file,
                                    media:fileReader.result as string,type:"video",
                                    id:nanoid()
                                    }]
                               })
                        } 
                       
                    }
                    handleFiles(files)
                }
                fileReader.readAsDataURL(file as File)
            }
            handleFiles(arrFiles)
        }
    }
    return (
        <>
             <div className="p-2 px-4">
                <div className="border rounded-lg shadow-[0px_0px_1px_1px_rgba(232,229,229,1)] flex justify-between p-3 items-center py-3">
                    <p className="font-semibold">Add to your post</p>
                    <div className="relative group cursor-pointer flex items-center justify-center">
                        <label htmlFor="media" className="p-1 rounded-full group-hover:bg-gray-300/50 transition-all duration-300 group-hover:hover-opacity cursor-pointer">
                            <IoMdPhotos className="text-green-1 text-2xl "/>
                        </label>
                        <input onChange={handleChange} type="file" id="media" className="hidden" multiple />
                        <div className="absolute -top-9 text-xs bg-black/80 text-white p-2 rounded-lg hidden group-hover:block transition-all duration-300">
                            Photo/Video
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}