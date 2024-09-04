import { UserType } from "@/lib/utils/types/user"


import PostsView from "./postsView"


export default function PostsTab({user,settings}:{
    user:UserType;
    settings:"public"|"friends"|"me"
}) {


    return (
        <div className="p-8 lg:p-12">
            <h1 className="font-bold text-xl">Posts</h1>
            <div className="mt-5 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <h2 className="font-semibold">Who can see your future posts?</h2>
                </div>
                <div className="flex flex-col gap-3">
                    <PostsView user={user} viewSettings={settings}/>
                </div>
                
                
            </div>
        </div>
    )
}