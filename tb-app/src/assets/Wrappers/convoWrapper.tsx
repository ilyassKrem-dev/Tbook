"use client"

import { useEffect,useState,useContext,createContext, SetStateAction } from "react"
import { ConvoType } from "@/lib/utils/types/convo"
import Convo from "@/lib/classes/Convo";
import ConvoTab from "../convo/convoTab";
import { loginInfo } from "./sessionWrapper";
import { RxCross2 } from "react-icons/rx";
import ConvoSide from "../convo/convoSide";
type IdsType = {
    user_id:string;
    other_id:string;
}

type ConvoContextType = {
    handleClick:(arg:IdsType) => void
}
const convoContext = createContext<ConvoContextType|undefined>(undefined)

export const useConvo = () => {
    const context = useContext(convoContext)
    if(!context) {
        throw new Error(`Should be inside the provider`)
    }
    return context
}


export const ConvoWrapper = ({children}:{
    children:React.ReactNode;
}) => {
    const [ids,setIds] = useState<IdsType>({
        user_id:"",other_id:""
    })
    const [convos,setConvos] = useState<ConvoType[]>([])
    const [sideConvos,setSideConvos] = useState<ConvoType[]>([]);
    const {user} = loginInfo()
    useEffect(() => {
        if(!ids.user_id) return
        const getConvo = async() => {
            const res = await Convo.getConvo(
                {
                    user_id:ids.user_id,
                    other_id:ids.other_id
                }
            )
            if(res?.success) {
                const find = convos.find(conv => conv.id === (res.data as any).id)
                const find2 = sideConvos.find(conv => conv.id === (res.data as any).id)
                setIds({
                    user_id:"",other_id:""
                })
                if(find) return
                if(find2) {
                    setConvos((prev:any) => [find2,...prev])
                    return setSideConvos(prev => (prev.filter(convo=>convo.id!==find2.id )))
                }
                setConvos((prev:any) => ([res.data,...prev]))
            }
        }
        getConvo()
    },[ids])
    const handleClick =(ids:IdsType) => {
        setIds(ids)
    }
    return (
        <convoContext.Provider value={
                        {
                            handleClick
                        }}>

                        {children}
                        {user&&convos.length>0&&
                        <ConvoTab 
                        convos={convos}
                        setConvos={setConvos}
                        user={user}
                     
                        setSideConvos={setSideConvos}/>}
                        <ConvoSide 
                        sideConvos={sideConvos} 
                        setSideConvos={setSideConvos}
                        setConvos={setConvos}
                        user={user}/>
        </convoContext.Provider>
    )
}