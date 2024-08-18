



export default function LeftSideTemplate() {

    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-3 items-center">
                <div className="flex relative mr-10">
                    <div className="flex flex-col gap-1 items-center relative justify-end">
                        <div className="absolute bottom-[4.5rem] bg-black h-[15px] w-[20px] rounded-t-md z-0" />
                        <div className="bg-blue-300 rounded-full py-3 w-[20px] h-[20px] relative z-10" />
                        <div className="w-[50px] h-[50px] rounded-t-lg bg-gray-400/80" />
                    </div>
                    <div className="flex items-center flex-col gap-1 justify-end absolute left-10 bottom-0">
                        <div className="flex flex-col relative">
                            <div className="bg-gray-500/50 rounded-full w-[15px] h-[15px]" />
                            <div className="bg-blue-500 rounded-full w-[25px] relative h-[25px] hair-icon overflow-hidden"/>
                        </div>
                        <div className="w-[65px] h-[40px] rounded-t-full bg-gray-500" />
                    </div>
                </div>
                <p className="text-gray-500/80 font-bold text-xl text-center">Select people's names to preview their profile.</p>
            </div>
        </div>
    )
}