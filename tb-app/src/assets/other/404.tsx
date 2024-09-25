import Link from "next/link"




export default function NotFound({err}:{
    err?:string
}) {

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="font-bold text-3xl">
                    404
                    </h1>
                    <p className="text-center text-xl">{err||"We couldn't find the page"}</p>
                </div>
                <Link href={"/"}>
                    <button className="bg-white !text-blue-400 hover:bg-blue-300 transition-all duration-300 px-5 p-2 rounded-md active:scale-95 ">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    )
}