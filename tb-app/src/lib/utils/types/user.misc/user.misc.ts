



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
    search:"friends"|"anywhere"|"friends_of";
    notification:"all"|"posts"|"messages"
}

