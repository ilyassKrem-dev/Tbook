


export type SignInInfoType = {
    name:string;
    username:string;
    email:string;
    password:string;
    password_confirm:string;
    gender:string;
    date:{
        day:string;
        month:string;
        year:number;
    }
}

export type LoginInfoType = {
    email:string;
    password:string
}