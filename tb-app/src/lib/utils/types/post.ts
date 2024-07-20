



export type MediaType = {
    id:string;
    file:File;
    media:string
    type:"image"|"video"|"audio"
}

export type LikeType = {
    id:string;
    user_id:string;
    post_id:string;
    created_at:string;
    updated_at:string;
}
export type PostMediaType = {
    id:string;
    url:string;
    type:"image"|"video"|"audio"
    user_id:string;
    post_id:string;
    created_at:string;
    updated_at:string;
}
export type PostType = {
    content:string;
    created_at:string;
    updated_at:string;
    medias:PostMediaType[];
    likes:LikeType[];
    status:string;
    user_id:string;
    id:string;
}