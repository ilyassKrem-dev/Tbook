



export type UserType = {
    id:string;
    name:string;
    image:string;
    status:string;
    email:string;
    username:string;
}
export type PostUserType = {
    id:string;
    name:string;
    username:string;
    image:string|null;
}

export type userFriendsType = {
    friend:{
        id:string;
        name:string;
        username:string;
        image:string|null;
        status:string;
    };
    unseenMsgs?:number
    convoId?:number
    user:string;
    status:string;
    id:string;
    status_by:string;
}
export type FullUserType = {
    id:string;
    name:string;
    username:string;
    image:string|null;
    status:string;
    email:string;
    cover_photo:string|null;
    phone:string|null;
    bio:string|null;        
    gender:string;
    country:string|null;
    birthdate:string;
}

export type UserDataType = {
    user:FullUserType;
    friends:userFriendsType[]
}