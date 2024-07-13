"use client"

import { useContext,createContext,useState, SetStateAction } from "react"
import Toast from "@/shared/toast"
type toastType = {
    varient:"success" | "error";
    title:string;
    description:string;
}
type ToastContextType = {
   toast:(arg:toastType) => void;
}
const toastContext = createContext<ToastContextType|undefined>(undefined)

export const useToast = () => {
    const context = useContext(toastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
      }
    return context
}

export const ToastProvider = ({children}:{children:React.ReactNode}) => {
    const [varient,setVarient] = useState<"error"|"success">("error")
    const [title,setTitle] = useState<string>("")
    const [description,setDescription] = useState<string>("") 
    const [show,setShow] = useState<boolean>(false)
    const toast = ({varient,title,description}:toastType) => {
        setVarient(varient)
        setTitle(title)
        setDescription(description)
        setShow(true)
    }
    return (
        <toastContext.Provider 
        value={{
            toast
        }}
        
            >
            <Toast 
            varient={varient}
            title={title}
            description={description}
            show={show}
            setShow={setShow}/>
            {children}

        </toastContext.Provider>
    )
}