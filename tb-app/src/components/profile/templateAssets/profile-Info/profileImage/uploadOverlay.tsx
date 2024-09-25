import { useToast } from "@/assets/Wrappers/toastWrapper"
import Profile from "@/lib/classes/Profile";
import { useRemoveOverlay } from "@/lib/utils/hooks";
import { useUploadThing } from "@/lib/utils/uploadthing"
import React, { ChangeEvent, SetStateAction, useState } from "react"
import { BsFillCloudUploadFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useSession } from "next-auth/react";
type ImageAddedType = {
    picture:string;
    file:File[]
}



export default function UploadOverlay({userId,setProfileImg,setShow}:{
    userId:string|undefined;
    setProfileImg:React.Dispatch<SetStateAction<string|null>>;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    const [imageAdded,setImageAdded] = useState<ImageAddedType>(
        {
            picture:"",file:[]
        }
    )
    const [startedDrag,setStartedDrag] = useState<boolean>(false) 
    const [progress,setProgress] = useState<number>(0)
    const {toast} = useToast()
    const {data:session,update} = useSession()
    const {startUpload} = useUploadThing("media",{
        onUploadProgress:(p:number) => setProgress(p)
    })
    const handleFile = (file:FileList) => {
        if(file&&file.length>0) {
            const fi = file[0]
            const fileReader = new FileReader()
            if(!fi.type.includes('image')) return
            fileReader.onload = (e) => {
                const image = e.target?.result?.toString() as string
                setImageAdded(prev=>({...prev,picture:image}))
            }
            setImageAdded(prev => ({...prev,file:[fi]}))

            fileReader.readAsDataURL(fi)
        }
    }
    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.target.files
        handleFile(file as FileList)
    }
    const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setStartedDrag(false)
        const file = e.dataTransfer.files
        handleFile(file)
    }
    const handleSave = async() => {
        let imgUrl = "";
        const {file} = imageAdded
        if(!imageAdded.picture || progress) return
        setProgress(2)
        const imgRes = await startUpload(file)
        if(imgRes && imgRes[0].url) {
            imgUrl = imgRes[0].url
        }
        const res = await Profile.ChangePicture(userId as string,imgUrl)
        if(res?.success) {
            setProfileImg(imgUrl)
            update({...session,user:{...session?.user,image:imgUrl}})
            return setShow(false)
        }
        if(res?.success == null) {
            return toast({
                varient:"error",
                title:"Error",
                description:res?.error as string
            })
        }
        if(res.success == false) {
            return toast({
                    varient:"error",
                    title:"Error",
                    description:res.error as string
                })
        }
    }
    useRemoveOverlay({
        tab:".upload_pic",
        setShow
    })
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-white/60 flex justify-center items-center flex-col no-doc-scroll z-40"
            onDragEnter={() => setStartedDrag(true)}
            onDragLeave={() => setStartedDrag(false)}
            >
                <div className="bg-white sm-shadow rounded-lg flex flex-col min-w-[280px]  sm:w-[400px] md:w-[500px] upload_pic">
                    <div className="flex justify-center items-center text-lg font-bold p-3 relative border-b border-black/10">
                        <h1>Add Image</h1>
                        <div className="absolute text-xl p-2 rounded-full bg-gray-300/60 cursor-pointer hover-opacity active:scale-90 right-3" onClick={() => setShow(false)}>
                            <RxCross2 />
                        </div>
                    </div>
                    
                    <div className={`h-[300px] py-3  ${startedDrag ?"bg-gray-500/10 blur-[1px]" : ""}`} 
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()
                    }>
                        <label   htmlFor="profile-image" className="h-full flex justify-center items-center flex-col cursor-pointer hover-opacity ">
                            {!imageAdded.picture?<>
                                <div className="text-8xl text-blue-400/50">
                                    <BsFillCloudUploadFill />
                                </div>
                                <p className="text-black/40 font-semibold cursor-pointer">Drop image or click here</p>

                            </>:
                            <>
                                <div className="rounded-full relative w-full flex justify-center items-center">
                                    <div className="w-[160px] h-[160px] rounded-full relative z-20">
                                        <img 
                                        src={imageAdded.picture} 
                                        alt="picture"
                                        className="rounded-full object-cover w-full h-full hover:blur-[0.5px]  active:scale-90 border  border-black/30 bg-white" />
                                    </div>
                                    <div className="absolute h-px w-full bg-black z-10">
                                        
                                    </div>
                                </div>
                            </>}

                        </label>
                        <input 
                        type="file" 
                        id="profile-image" 
                        name="profile-image" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleInput}/>
                    </div>
                    <div className="flex p-2 border-t border-t-black/10 justify-center">
                        <div className="p-2 flex gap-3 flex-col sm:flex-row">
                            {imageAdded.picture&&
                            <>
                                <label htmlFor="change_picture" className="p-2 bg-accent rounded-lg text-white  font-semibold capitalize hover-opacity active:scale-90 cursor-pointer w-[138px]">Change picture</label>
                                <input type="file" accept="image/*" id="change_picture" className="hidden" onChange={handleInput}/>
                            </>
                            }
                            <button className="relative p-2 bg-blue-400 rounded-lg text-white  font-semibold capitalize hover-opacity active:scale-90 cursor-pointer w-[138px] disabled:bg-black/40 disabled:cursor-default"
                            disabled={imageAdded.picture.length==0} onClick={handleSave}>
                                <p className=" text-center relative z-20 cursor-pointer">{!progress?"Save":"Uploading"}</p>
                                
                                {progress?<div className="absolute rounded-lg top-0 bottom-0 left-0 h-full  w-full z-10"
                                style={
                                {backgroundColor:" rgb(75,206,157)",
                                width:`${progress}%`}
                                }>

                                </div>:""}
                            </button>
                    
                        </div>

                    </div>
                </div>
            </div>
    )
}