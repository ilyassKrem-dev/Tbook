"use client"

import { useEffect,useState,useContext,createContext, SetStateAction } from "react"
import { ConvoType } from "@/lib/utils/types/convo"
import ConvoClass from "@/lib/classes/Convo";
import ConvoTab from "../convo/convoTab";
import { useLoginInfo } from "./sessionWrapper";
import ConvoSide from "../convo/convoSide";
import { useSize } from "@/lib/utils/hooks";
import { UseDispatch,useDispatch,useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { addConvo, moveToConvos, removeSideConvo } from "../redux/convoRedux";
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
    const dispatch = useDispatch<AppDispatch>()
    const convos = useSelector((state:RootState) => state.convo.convos)
    const sideConvos = useSelector((state:RootState)=>state.convo.sideConvos)
    const [ids,setIds] = useState<IdsType>({
        user_id:"",other_id:""
    })
    const {user} = useLoginInfo()
    useEffect(() => {
        if(!ids.user_id) return
        const getConvo = async() => {
            const res = await ConvoClass.getConvo(
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
                    return dispatch(moveToConvos(res.data as any))
                }
                dispatch(addConvo(res.data as any))
            }
        }
        getConvo()
    },[ids,dispatch,convos,sideConvos])
    const handleClick =(ids:IdsType) => {
        setIds(ids)
    }
    const {w} = useSize()
    return (
        <convoContext.Provider value={
                        {
                            handleClick
                        }}>

                        {children}
                        {user&&w>767&&convos.length>0&&
                        <ConvoTab 
                        convos={convos}
                        
                        user={user}
                        dispatch={dispatch}
                        />}
                        {w>767&&<ConvoSide 
                        sideConvos={sideConvos} 
                        user={user}
                        dispatch={dispatch}/>}
        </convoContext.Provider>
    )
}