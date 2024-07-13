
import Login from "@/assets/account/login/login"

export default function NoAuthTemplate() {
   
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 h-full md:px-2 lg:px-0 lg:gap-16 xl:gap-24 2xl:gap-36">
            <div className="flex flex-col gap-2 items-center max-w-[600px] lg:items-start">
                <h1 className="text-blue-600 font-bold text-6xl">Tbook</h1>
                <p className="hidden md:block font-semibold text-xl">Connect with friends,people from all the world</p>
            </div>
            
            <Login />
        </div>
    )

}