import Link from "next/link"
import SettingSearch from "./assets/leftSide/search/settingsSearch"
import { HomeOthers, HomeTabs } from "./misc/tabs&links"
import { FaArrowRight } from "react-icons/fa6"
export default function SettingsHome() {
    
    return (
        <div  className="lg:p-4 max-w-[930px] mx-auto">
            <div className="flex flex-col gap-8 bg-white rounded-lg p-8 lg:px-12 h-full">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-xl">Find the setting you need</h1>
                    <SettingSearch 
                    className="rounded-lg !h-[70px] !px-12"
                    searchClass="!text-3xl"
                    resultsClass="!top-[4.5rem]"
                    />
                    
                </div>
                <div className="flex gap-4 flex-col">
                    <h2 className="font-bold text-xl">Most visited settings </h2>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,1fr)_200px)] gap-3">
                        {HomeTabs.map((tab,index) => {
                            const {imgSrc,link,title,desc} = tab
                            return (
                                <Link key={index} href={`/profile${link}`} className="bg-gray-1 rounded-lg h-[280px] cursor-pointer hover-opacity hover:bg-black/10">
                                    <div className="w-[80px] h-[80px] mx-auto mt-8">
                                        <img 
                                        alt="image" 
                                        className="rounded-full w-full h-full" 
                                        src={imgSrc} />
                                    </div>
                                    <div className="flex flex-col items-start p-1 px-4 pt-6">
                                        <h4 className="font-semibold text-lg cursor-pointer">{title}</h4>
                                        <p className="text-black/60 text-[0.9rem] cursor-pointer">{desc}</p>
                                    </div>
                                </Link>

                            )
                        })}
                            
                    </div>

                </div>
                <div className="flex gap-4 flex-col">
                    <h3 className="font-bold text-xl">Looking for something else?</h3>
                    <div className="flex flex-col gap-2">
                        {HomeOthers.slice(0,2).map((tab,index)=> {
                            const {imgSrc,title,desc,link} = tab
                            return (
                                <Link key={index} href={`/profile${link}`} className="bg-gray-1 rounded-lg p-10 flex items-center justify-between py-8 hover-opacity hover:bg-black/10 cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-[80px] h-[80px]">
                                            <img src={imgSrc} alt="" className="h-full w-full" />
                                        </div>
                                        <div className="flex flex-col items-start ">
                                            <h4 className="font-semibold text-lg cursor-pointer">{title}</h4>
                                            <p className="text-black/80 text-[0.9rem] cursor-pointer">{desc}</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl">
                                        <FaArrowRight />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}