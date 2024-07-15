import { UserType } from "@/lib/utils/types/user"

import TopOfRight from "./topOfRight";



export default function  RightHome({user}:{
    user:UserType
}) {

    return (
        <div className=" md:w-[280px] 2xl:w-[350px] h-full overflow-y-auto custom-scrollbar pb-8 hidden md:block">
            <TopOfRight />
            <div>
                {/*Later after profile*/ }
            </div>
        </div>
    )
}