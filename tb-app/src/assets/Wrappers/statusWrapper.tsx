
import { useCallback, useEffect } from "react";
import { useLoginInfo } from "./sessionWrapper"
import { updateStatus } from "../status/utils";


export default function StatusWrapper({children}:{
    children:React.ReactNode
}) {
    const {user} = useLoginInfo()
    
    
    const handleBeforeUnload = useCallback((event:any) => {
        updateStatus(user,"offline");
        event.returnValue = ""; 
        return "";
    },[user]);
    useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    }, [user,handleBeforeUnload]);
    return (
        children
    )
}