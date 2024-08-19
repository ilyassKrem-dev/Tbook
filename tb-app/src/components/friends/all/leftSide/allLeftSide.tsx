import { UserType, userFriendsType } from "@/lib/utils/types/user"
import LeftTemplate from "../../shared/leftTemplate";
import { useSize } from "@/lib/utils/hooks";
import { SetStateAction } from "react";
import AllLeftLg from "./lg-screen/allLeft-lg";
import AllLeftSm from "./sm-screen/allLeft-sm";
import React from "react";

const LeftSidelgMemo = React.memo(AllLeftLg)
const LeftSidesmMemo = React.memo(AllLeftSm)

export default function AllLeftSide({loggedInfo,friends,setFriends}:{
    loggedInfo:UserType;
    friends:userFriendsType[];
    setFriends:React.Dispatch<SetStateAction<userFriendsType[]>>
}) {
    const {w} = useSize()
    return (
        <LeftTemplate>
            {w>767&&<LeftSidelgMemo 
            friends={friends} 
            setFriends={setFriends} 
            loggedInfo={loggedInfo}/>}
            {w<=767&&
            <LeftSidesmMemo 
            friends={friends} 
            setFriends={setFriends} 
            loggedInfo={loggedInfo}/>}
        </LeftTemplate>
    )
}