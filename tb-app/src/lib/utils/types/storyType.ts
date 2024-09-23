

export type UserStoryType = {
    id:string;
    name:string;
    image:string|null;
    username:string;

}
export type StoryType = {
    id:string;
    created_at:string;
    bgColor:string;
    media:string|null;
    mediaClass:string|null;
    text:string|null;
    textColor:string;
    type:"text"|"photo";
    user:number;
    visibility:"all"|"friends"
}

export type StoryHomeType = {
    user:UserStoryType;
    story:StoryType
}

export type StoryViewType = {
    user:UserStoryType;
    stories:StoryType[]
}