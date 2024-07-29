
import { motion } from "framer-motion"
import { RefObject, SetStateAction, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6"
import { IoSearch } from "react-icons/io5"
import { useRouter,usePathname,useSearchParams } from "next/navigation";
import Link from "next/link";
import User from "@/lib/classes/User";
interface Props {
    inputRef:RefObject<HTMLInputElement>;
    focused:boolean;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    setFocused:React.Dispatch<SetStateAction<boolean>>;
    handleFocus:() => void;
}
type ResultsType = {
    name:string;
    username:string;
    id:string;
    image:string|null
}
export default function SearchFunc({inputRef,focused,setShow,setFocused,handleFocus}:Props) {
    const [results,setResults] = useState<ResultsType[]>([])
    const [inputString,setInputString] = useState<string>("")
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const searchString = searchParams?.get("search")
    useEffect(() => {
        const id = setTimeout(() => {
            if(inputString) {
                router.push(`${pathname}?search=${inputString}`)
            } else {
                setResults([])
                router.push(`${pathname}`)
            }
        },100)
        return () => clearTimeout(id)
    },[inputString])
    useEffect(() => {
        if(!searchString) return
        const getResults = async() => {
            const res = await User.getSearchResults(searchString)
            if(res?.success){
                setResults(res.data)
            }
        }
        getResults()
    },[searchString])
  
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute bg-white flex flex-col items-center gap-5 z-30 rounded-lg left-0 top-0 p-2 px-3 shadow-[-1px_4px_3px_1px_rgba(232,229,229,1)] "
            >
                <div className="flex items-center gap-2">
                    <div
                        className="rounded-full hover:bg-gray-300/50 p-2 cursor-pointer"
                        onClick={() => setShow(false)}
                    >
                        <FaArrowLeft className="text-black/60 text-lg" />
                    </div>

                    <div className="relative flex justify-center items-center">
                        <motion.input
                            initial={{paddingLeft:focused?"16px":"32px"}}
                            animate={{paddingLeft:focused?"16px":"32px"}}
                            transition={{duration:0.2,ease:"linear"}}
                            ref={inputRef}
                            name="inputString"
                            id="search"
                            type="text"
                            value={inputString}
                            
                            onChange={(e) => setInputString(e.target.value)}
                            className={`rounded-full p-1 focus-within:outline-none bg-gray-1/80 text-base placeholder:text-base  w-[250px] max-[320px]:w-[200px]`}
                            placeholder="Search"
                            onFocus={handleFocus}
                            onBlur={() => setFocused(false)}
                        />
                        <motion.div
                        initial={{opacity:focused?0:1}}
                        animate={{opacity:focused?0:1}}
                        transition={{duration:0.2,ease:"linear"}}  
                        className="absolute left-2">
                            <IoSearch className="text-xl text-black/30"/>

                        </motion.div>
                    </div>
                </div>
                <div className="w-full ">
                    {results.length == 0 
                    ?
                    <p className="text-black/60">No recent searches</p>
                    :
                    <div className="w-full ">
                        {results.map((result,index) => {
                            const {name,username,image} = result
                            const splitedName = name.toLowerCase().split("")
                            const splitedSearch = inputString.toLowerCase().split("") as string[]
                            return (
                                <Link key={result.id + index} href={`/profile/${username}`} className="flex gap-2 hover:bg-gray-300/40 p-2 rounded-lg transition-all duration-300">
                                    <div className="h-[36px] w-[36px] rounded-lg relative">
                                        <img 
                                        src={image?image:"/profile.jpg"} 
                                        alt={`${name} picture`}
                                        className="w-full h-full rounded-full object-cover" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div>
                                            {splitedName.map((spName,index) => {
                                                const equal = splitedName[index] === splitedSearch[index]
                                                return (
                                                    <span key={index} className={`${equal?"":"font-semibold"}`}>
                                                        {spName}
                                                    </span>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>}

                </div>
            </motion.div>
        </>
    )
}