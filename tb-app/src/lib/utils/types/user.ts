



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
    username:string;
    name:string;
    id:string;
    image:string;
    country:string;
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