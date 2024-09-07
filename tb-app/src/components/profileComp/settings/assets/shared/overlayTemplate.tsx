import { SetStateAction } from "react";
import ReactDOM from "react-dom"
import { RxCross2 } from "react-icons/rx";





export default function OverlayTemplate({children,setShow,title,moreLight}:{
    children:React.ReactNode;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    title:string;
    moreLight?:boolean
}) {


    return (
        <>
            {ReactDOM.createPortal(<div className={`fixed top-0 right-0 left-0 bottom-0 z-40  flex justify-center items-center ${moreLight?"bg-white/80":"bg-white/60"}`} onClick={() => setShow(false)}>
                    <div className="sm:w-[300px] md:w-[500px] rounded-lg min-h-[200px] max-h-[500px] bg-white shadow-xl flex flex-col border" onClick={(e) => e.stopPropagation()}>
                        <div className="p-3 flex justify-center items-center relative border-b-2">
                            <h1 className="text-xl font-bold">{title}</h1>
                            <div className="absolute right-2 bg-gray-500/30 rounded-full text-2xl active:scale-95 p-1 hover:bg-gray-500/60 cursor-pointer transition-all duration-300" onClick={() => setShow(false)}>
                                <RxCross2 />
                            </div>
                        </div>
                        {children}
                    </div>
            </div>,document.body)}
        
        </>
    )
}