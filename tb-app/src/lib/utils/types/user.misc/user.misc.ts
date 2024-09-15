



export type UnblockedConvosType = {
    id:number;
    user:number;
    other:{
        id:number;
        image:string|null;
        name:string;
        username:string
    }
}

export type UserPrivacyType ={
    id:number;
    user:number;
    posts:"friends"|"public"|"me";
    search:"all"|"fff"|"me";
    notification:"all"|"posts"|"requests";
    requests:"all"|"fff",
    friends:"all"|"fff"|"friends"|"me"
}

export type MoreInfoType = {
    id:number;
    user:number;
    work:string|null;
    school:string|null;
    city:string|null;
    website:string|null;
    country:string|null;
    language:string|null;
    created_at:string;
    updated_at:string;


}

