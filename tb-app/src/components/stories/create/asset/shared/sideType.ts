import { SetStateAction } from "react";




export  type SideSmType = {
    selected:{
        bgColor:string;
        textColor:"black"|"white";
    };
    setSelected:React.Dispatch<SetStateAction<{
        bgColor:string;
        textColor:"black"|"white";
    }>>;
    textStory:string;
    setTextStory:React.Dispatch<SetStateAction<string>>;
    setShowEmoji:React.Dispatch<SetStateAction<boolean>>;
    showEmoji:boolean;
    handleClickEmoji: (args:any) => void;
    handleColorClick:(arg1:string,arg2:string) => void;
    story:"photo"|"text";
    setShow:React.Dispatch<SetStateAction<boolean>>;
    handleSave:() => void
}
export  type SideType = {
    selected:{
        bgColor:string;
        textColor:"black"|"white";
    };
    setSelected:React.Dispatch<SetStateAction<{
        bgColor:string;
        textColor:"black"|"white";
    }>>;
    textStory:string;
    setTextStory:React.Dispatch<SetStateAction<string>>;
    setStory:React.Dispatch<SetStateAction<"text"|"photo"|undefined>>;
    story:"text"|"photo";
    photoStory:{
        media:string;
        file:File[];
        class:{
            scale:number;
            rotate:number
        }
    };
    choice:"all"|"friends";
    setShow:React.Dispatch<SetStateAction<boolean>>;
}