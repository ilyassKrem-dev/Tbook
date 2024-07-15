
import { SetStateAction } from "react";
import { SignInInfoType } from "./types/auth";

export const validationErrors = ({
    info,
    setErrors
}: {
    info: SignInInfoType,
    setErrors: React.Dispatch<SetStateAction<any>>
}) => {
    const { name, username, email, password, password_confirm, date, gender } = info;
    const errors: any = {};
    let errorFound:boolean = false
    // Required fields and minimum length checks
    if (!name || name.length <= 3) {
        errors.name = "Name must be more than 3 characters.";
        errorFound=true
    }

    if (username && username.length <= 2) {
        errors.username = "Username must be more than 2 characters.";
        errorFound=true
    }

    if (!email || !isValidEmail(email)) {
        errors.email = "Please enter a valid email address.";
        errorFound=true
    }

    if (!password || password.length <= 6) {
        errors.password = "Password must be more than 6 characters.";
        errorFound=true
    }

    if (!password_confirm || password_confirm !== password) {
        errors.password_confirm = "Passwords do not match.";
        errorFound=true
    }
    //@ts-ignore
    if (!date || !isValidDate(date)) {
        errors.date = "You must be more than  5 years older to sign.";
        errorFound=true
    }
    if (!gender) {
        errors.gender = "You must select gender";
        errorFound=true
    }
    setErrors((prev: any) => ({ ...prev, ...errors }));
    return errorFound
};

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidDate = (date: { day: number, month: string, year: number }): boolean => {
    if (!date.day || !date.month || !date.year) {
        return false;
    }
    const monthIndex = getMonthIndex(date.month);
    if (monthIndex === -1) {
        return false; 
    }
    const currentYear = new Date().getFullYear()
    const inputDate = new Date(date.year, monthIndex, date.day).getFullYear(); 
    return currentYear > inputDate + 5;
};
const getMonthIndex = (monthString: string): number => {
    const months:string[] = [];
    for (let i=0;i<12;i++) {
        const date = new Date(2024,i,1)
        months.push(date.toLocaleDateString(undefined,{month:"short"}))
    }

    const monthIndex = months.findIndex(m => m.toLowerCase() === monthString.toLowerCase());
    return monthIndex;
};