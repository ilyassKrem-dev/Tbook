import { UserDataType, UserType } from "@/lib/utils/types/user"

import ProfileImage from "./profile-Info/profileImage/profileImage";
import ProfileButtons from "./profile-Info/profileImage/btns/profileButtons";
import ProfileTabs from "./profile-Info/tabs/profileTabs";
import ProfileViewBtns from "./profile-Info/profileImage/btns/profileViewBtns";
export default function ProfileInfo({userData,loggedInfo,view}:{
    userData:UserDataType;
    loggedInfo:UserType|null;
    view?:boolean
}) {
    const {user,friends} = userData
    
    const checkUser = user.id == loggedInfo?.id
    const checkIfFreinds = friends.some(friend=> friend.friend.id===loggedInfo?.id)

    return (
        <div className="flex  flex-col">
            <div className="relative flex flex-col lg:flex-row  lg:gap-5 px-6 max-lg:justify-center max-lg:items-center">
                <ProfileImage 
                profileImage={user.image}
                profileName={user.name}
                isUser={checkUser}
                userId={loggedInfo?.id}
                view={view} />
                <div className="flex flex-col gap-1 mt-1  flex-1 mb-4 lg:mb-1 lg:mt-4 items-center lg:items-start">
                    <h1 className="font-bold text-3xl capitalize">{user.name}</h1>
                    <p className="text-gray-600">{friends.length} {friends.length === 1 ?"friend" :"friends"}</p>
                </div>
                {checkUser&&!view&&<ProfileButtons />}
                {view&&!checkUser&&loggedInfo&&
                <ProfileViewBtns 
                profileId={user.id}
                isFriends={checkIfFreinds}
                userId={loggedInfo?.id}/>}
            </div>
            <div className="h-px w-full bg-gray-300 mb-2" />
            <ProfileTabs view={view}/>
        </div>
    )
}