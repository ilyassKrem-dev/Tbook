
import { useCallback, useEffect } from "react";
import { loginInfo } from "./sessionWrapper"
import { updateStatus } from "../status/utils";


export default function StatusWrapper({children}:{
    children:React.ReactNode
}) {
    const {user} = loginInfo()
    
    
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
    }, [user]);
    return (
        children
    )
}