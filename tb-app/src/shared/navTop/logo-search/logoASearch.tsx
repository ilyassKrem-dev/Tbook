
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import {   useEffect, useRef, useState } from "react";
import { AnimatePresence} from "framer-motion";
import { useRemoveOverlay } from "@/lib/utils/hooks";
import SearchFunc from "./searchFunc";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
export default function LogoASearch({w}:{w:number}) {
    const [show,setShow] = useState<boolean>(false)
    const [focused,setFocused] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchString = searchParams?.get("search")
    const handleShow = () => {
        setShow(true)
        handleFocus()

        
    }
    const handleClose = () => {
        if(pathname !=="/stories/create") return
        router.push("/");
    }
    const handleFocus = () => {
        if (inputRef.current) {
            setFocused(true)
            inputRef.current.focus();
        }
    };
    useEffect(() => {
        document.addEventListener("keydown",(e) => {
            if(e.key == "Escape") {
                router.push("/");
            }
        })
    },[router])
    useRemoveOverlay({
        tab:".search-tab",
        setShow:setShow
    })
    return (
        <div className={`py-2 flex gap-2 items-center  left-0 pl-3 ${w>953 ?"absolute ":""} search-tab`}>
            {pathname ==="/stories/create"&&
            <div className="relative flex items-center justify-center group rounded-full" onClick={handleClose}>
                <div className="bg-gray-300/60 p-2 text-2xl rounded-full cursor-pointer hover:bg-gray-300 transition-all duration-300 active:scale-95">
                    <RxCross2 />
                </div>
                <div className="absolute top-11 p-2 px-2 rounded-md bg-black/70 w-[120px] text-white text-xs left-0 group-hover:block hidden transition-all duration-500 delay-500">
                    Press Esc to close
                </div>
            </div>}
            <Link href={"/"} className="bg-blue-600 text-white  rounded-full text-2xl font-bold p-1 px-3">
                T
            </Link>
            {pathname!=="/stories/create"&&<>
                {w>953?
                <div className="relative flex justify-center items-center">
                    <div onClick={handleShow}  className={`rounded-full p-2 focus-within:outline-none bg-gray-1/80 text-base placeholder:text-base pl-8 w-[250px] text-black/50 cursor-text`} >
                        {searchString?searchString:"Search"}
                    </div>
                    <IoSearch className="absolute left-2 text-xl text-black/30"/>
                </div>
                :
                <div className="bg-white-1/60 p-3 rounded-full cursor-pointer" onClick={handleShow}>
                    <IoSearch className="text-base text-black/80"/>
                </div>
                }
                <AnimatePresence>
                {show && (
                        <SearchFunc 
                        inputRef={inputRef}
                        focused={focused}
                        setShow={setShow}
                        setFocused={setFocused}
                        handleFocus={handleFocus}/>
                    )}

                </AnimatePresence>
            
            </>}
        </div>
    )   
}