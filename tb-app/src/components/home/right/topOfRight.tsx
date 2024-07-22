

import { IoSearch } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";


export default function  TopOfRight() {
  
    return (
        <div className={`p-2 font-semibold capitalize flex flex-col gap-4 pr-3 `}>
            <div className="flex justify-between items-center text-gray-800 text-lg">
                <p>Contacts</p>
                <div className="flex items-center gap-3 text-lg">
                    <div className="p-2 hover:bg-gray-300/70 rounded-full active:bg-gray-300 transition-all duration-300 cursor-pointer relative flex flex-col items-center justify-center group">
                        <IoSearch />
                        <div className=" absolute -bottom-9 text-sm bg-dark/80 text-white p-1 rounded-lg font-medium hidden group-hover:block">
                            Search
                        </div>
                    </div>
                    <div className="p-2 hover:bg-gray-300/70 rounded-full active:bg-gray-300 transition-all duration-300 cursor-pointer relative flex flex-col items-center justify-center group">
                        <BsThreeDots />
                        <div className=" absolute -bottom-9 text-sm bg-dark/80 text-white p-1 rounded-lg font-medium hidden group-hover:block">
                            options
                        </div>
                    </div>
                    
                </div>
            </div>
        
        </div>
    )
}