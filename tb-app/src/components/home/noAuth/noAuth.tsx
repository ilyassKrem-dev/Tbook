import NoAuthTemplate from "./noAuthTemplate"
import { useSize } from "@/lib/utils/hooks"

export default function NoAuth() {
    const {h} = useSize()
    return (
        <div className={`flex flex-col overflow-y-auto ${h>650?"h-screen":"h-full"}`}>
            <NoAuthTemplate />
            {h>650&&<div className="bg-white  w-full text-center py-4 text-lg">
                &copy;IlyassKrem-dev
            </div>}
        </div>
    )

}