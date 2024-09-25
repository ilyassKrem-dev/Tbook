
import { useSize } from "@/lib/utils/hooks";
import { TiMessages } from "react-icons/ti";
import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper";





export default function MessagesPage() {
    const {user} = useLoginInfo()
    const {w} = useSize()

    return (
        <>
            {user&&w>767&& 
            <div className="flex-1 h-full">
                <div className="flex justify-center items-center flex-col h-full">
                    <div className="text-8xl">
                        <TiMessages /> 
                    </div>
                    <p className="text-base font-semibold text-center">Select a profile to view messages</p>
                </div>
                    
            </div>
                    
           }
        </>
       
    )
}