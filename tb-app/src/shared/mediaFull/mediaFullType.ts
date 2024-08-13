

type MediaType = {
    id:string
    url:string;
    type:"audio"|"image"|"video";
    created_at:string;
    message_id:string
}


export type MediaFullType = {
    info:{
        id:string;
        name:string;
        username:string;
        image:string;
    }
    media:MediaType,
    medias:MediaType[]
}
