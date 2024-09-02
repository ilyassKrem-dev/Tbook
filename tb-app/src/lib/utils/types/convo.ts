
import { PostMediaType } from "./post"


export type MessageType = {
    id:string;
    convo_id:string;
    sender:string;
    receiver:string;
    content:string|null;
    reaction:string|null
    medias:PostMediaType[];
    seen:boolean;
    created_at:string;
    updated_at:string;
}
export type AllConvosType = {
    id:string;
    user_id:string;
    other:{
        id:string;
        status:string;
        image:string|null;
        name:string;
        username:string;
    };
    status:string|null;
    status_by:string|null;
    message:MessageType
}
export type ConvoType = {
    id:string;
    user_id:string;
    other:{
        id:string;
        status:string;
        image:string|null;
        name:string;
        username:string;
    };
    status:string|null;
    status_by:string|null;
    messages:MessageType[]
}