import { UserDataType } from "@/lib/utils/types/user"
import SendPost from "./assets/sendPost"



export default function PostsTab({userData}:{
    userData:UserDataType
}) {
    const {user,friends} = userData
    return (
        <>
            <div className="flex gap-3 bg-gray-1 items-center">
                <div className="bg-white rounded-lg p-3 flex-1 font-bold max-w-[490px]">
                    <h1 className="text-lg">Intro</h1>
                </div>
                <SendPost user={user}/>
            </div>
        </>
    )
}