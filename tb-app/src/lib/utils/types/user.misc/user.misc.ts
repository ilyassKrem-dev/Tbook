



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
    notification:"all"|"posts"|"messages";
    requests:"all"|"fff",
    friends:"all"|"fff"|"friends"|"me"
}

