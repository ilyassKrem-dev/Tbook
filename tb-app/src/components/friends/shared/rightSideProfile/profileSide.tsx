import { useSearchParams } from "next/navigation"
import ProfileBy from "@/components/profile/profileByUsername/profileBy"
import LeftSideTemplate from "../leftSide/leftSideTemplate"

export default function ProfileSide() {
    const searchParams = useSearchParams()
    const profileUsername = searchParams?.get("profile")
    
    return (
        <>
            {!profileUsername&&<LeftSideTemplate />}
            {profileUsername&&<ProfileBy userName={profileUsername} fromRequest/>}
        </>
    )
}