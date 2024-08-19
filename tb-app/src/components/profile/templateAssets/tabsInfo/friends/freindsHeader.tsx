import Link from "next/link";
import { ChangeEvent } from "react";
import { IoSearch } from "react-icons/io5";





export default function FriendsHeader({handleSearch}:{
    handleSearch:(e:ChangeEvent<HTMLInputElement>) => void;
}) {

    return (
        <div className="flex justify-between items-center flex-col md:flex-row gap-2 md:gap-0"> 
            <h1 className="font-bold text-xl capitalize">friends</h1>
            <div className="flex gap-2 items-center flex-col sm:flex-row ">
                <div className="relative flex justify-center items-center">
                    <input 
                    type="text"
                    onChange={handleSearch} 
                    className="bg-gray-300/20 p-1 rounded-full px-3 focus-within:outline-none placeholder:text-base w-[200px] pl-7 font-light" placeholder="Search" />
                    <div className="absolute left-1">
                        <IoSearch className="text-xl text-black/30"/>
                    </div>
                </div>
                <Link href={"/friends"} className="text-blue-400 hover:bg-gray-300/30 p-2 px-3 rounded-md  font-semibold transition-all duration-300">
                    Friend requests
                </Link>
                <Link href={"/friends"} className="text-blue-400 hover:bg-gray-300/30 p-2 px-3 rounded-md  font-semibold transition-all duration-300">
                    Find friends
                </Link>
            </div>
        </div>
    )
}