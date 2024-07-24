import { UserDataType, UserType } from "@/lib/utils/types/user"

import ProfileImage from "./profile-Info/profileImage/profileImage";
import ProfileButtons from "./profile-Info/profileButtons";
import ProfileTabs from "./profile-Info/tabs/profileTabs";

export default function ProfileInfo({userData,loggedInfo}:{
    userData:UserDataType;
    loggedInfo:UserType|null
}) {
    const {user,friends} = userData
    const checkUser = user.id == loggedInfo?.id
    return (
        <div className="flex  flex-col">
            <div className="relative flex flex-col lg:flex-row  lg:gap-5 px-6 max-lg:justify-center max-lg:items-center">
                <ProfileImage 
                profileImage={user.image}
                profileName={user.name}
                isUser={checkUser}
                userId={loggedInfo?.id} />
                <div className="flex flex-col gap-1 mt-1  flex-1 mb-4 lg:mb-1 lg:mt-4 items-center lg:items-start">
                    <h1 className="font-bold text-3xl capitalize">{user.name}</h1>
                    <p className="text-gray-600">{friends.length} friends</p>
                </div>
                {checkUser&&<ProfileButtons />}

            </div>
            <div className="h-px w-full bg-gray-300 mb-2" />
            <ProfileTabs/>
        </div>
    )
}