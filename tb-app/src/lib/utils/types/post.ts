import { PostUserType } from "./user";




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
    post_id:string|null;
    message_id:string|null;
    created_at:string;
    updated_at:string;
}
export type PostType = {
    content:string;
    created_at:string;
    updated_at:string;
    f_comment:FCommentType|null;
    medias:PostMediaType[];
    parent_post:PostType|null
    likes:LikeType[];
    status:string;
    user_id:string;
    user:PostUserType|null;
    id:string;
}
export type DefaultPostType = {
    content:string;
    created_at:string;
    updated_at:string;
    medias:PostMediaType[];
    parent_post:DefaultPostType|null
    likes:LikeType[];
    status:string;
    user:PostUserType;
    id:string;
}
export type FCommentType = {
    id:string;
    created_at:string;
    updated_at:string;
    content:string;
    post_id:string;
    likes:number;
    replies:CommentType[]
    user:{
        id:string;
        name:string;
        username:string;
        image:string|null;
    };
    parent_id:string|null;
    more:boolean
}

export type CommentType = {
    id:string;
    created_at:string;
    updated_at:string;
    content:string;
    post_id:string;
    likes:number;
    user:{
        id:string;
        name:string;
        username:string;
        image:string|null;
    };
    parent_id:string|null
}