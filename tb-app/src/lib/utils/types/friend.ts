
export type OtherType = {
    id:number;
    name:string;
    image:string|null;
    username:string;
    country:string|null
}
export type FriendType = {
    id:number;
    status:string;
    user:OtherType
}

export type FriendsReqType = {
    requests:FriendType[],
    others:OtherType[]
}