"use client"
import { useContext,createContext,useState } from "react"
import MediaFull from "@/shared/mediaFull/mediaFull";
import  {MediaFullType} from "@/shared/mediaFull/mediaFullType"

type MediaContextType = {
    handleMediaClick:(arg:any) => void
}
const mediaContext = createContext<MediaContextType|undefined>(undefined)

const defaultMediaInfo:MediaFullType = {
    info:{
        id:"",
        name:"",
        username:"",
        image:""
    },
    media:{
        id:"",
        url:"",
        type:"image",
        created_at:"",
        message_id:""

    },
    medias:[]
}

export const useShowMedia = () => {
    const context = useContext(mediaContext)
    if(!context) {
        throw new Error(`error`)
    }
    return context
}

export const MediaWrapper = ({children}:{
    children:React.ReactNode
}) => { 
    const [clickedMedia,setClickedMedia] = useState<MediaFullType|null>(null)
    const handleMediaClick = (mediaClicked:MediaFullType|null) => {
        if(!mediaClicked) {
            setClickedMedia(defaultMediaInfo)
        }
        setClickedMedia(mediaClicked as MediaFullType)
    }

    return (
        <mediaContext.Provider value={{handleMediaClick}}>
            {children}
           {clickedMedia&&
           <MediaFull clickedMedia={clickedMedia} handleMediaClick={handleMediaClick}/>}
        </mediaContext.Provider>
    )
}

