"use client"

import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper"
import { useEffect, useState } from "react"
import { UserDataType } from "@/lib/utils/types/user"
import User from "@/lib/classes/User"
import ProfileTemplate from "../profileTemplate"
import TopNav from "@/shared/navTop/topNav"
import Login from "@/assets/account/login/login"
import { RxCross2 } from "react-icons/rx"
import NoAuthNav from "@/assets/unAuth/noAuthNab"
export default function ProfileBy({userName,fromRequest}:{
    userName:string;
    fromRequest?:boolean
}) {
    const [profileInfo,setProfileInfo] = useState<UserDataType>()
    const [show,setShow] = useState<boolean>(false)
    const {user,loginStatus} = useLoginInfo()
    useEffect(() => {
        const getInfo = async() => {
            const res = await new User(userName).getUserData()
            if(res?.success) {
                setProfileInfo(res.data)
            }
            
        }
        getInfo()
    },[user,userName])
    useEffect(() => {
        if(user||loginStatus==null) return
        setShow(true)
    },[loginStatus,user])
    
    return (
        <div>
            {loginStatus!==null
            &&
            <>
                {user
                ?
                <TopNav />
                :
                <NoAuthNav />}
            </>}
            {profileInfo&&
            <ProfileTemplate 
                userData={profileInfo}
                loggedInfo={user}
                view={Boolean(userName)}
                fromRequest={fromRequest}
            />}
            {show&&<div className="fixed top-0 right-0 left-0 bottom-0 bg-white/70 z-50 flex justify-center items-center no-doc-scroll" onClick={() => setShow(false)}>
                <div className="sm-shadow rounded-lg border border-black/10 relative" onClick={(e) => e.stopPropagation()}>
                    <div className="absolute top-[0.9rem] right-3 text-2xl bg-gray-400/50 rounded-full p-1 hover-opacity active:scale-95 cursor-pointer" onClick={() => setShow(false)}>
                        <RxCross2 />
                    </div>
                    <Login />
                </div>
            </div>}
        </div>
    )
}