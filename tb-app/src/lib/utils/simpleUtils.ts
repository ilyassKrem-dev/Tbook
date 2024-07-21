
export const getStringDate = (time:string) => {
    
    const date = new Date(time)
    const month = date.toLocaleDateString(undefined,{month:"long"})
    const day = date.getDate()
    const year = date.getFullYear()
    return {day,month,year}
}

export const currentDate = () => {
    const date = new Date()
    const day = date.getDate();
    const month = date.toLocaleString("month",{month:"short"});
    const year = date.getFullYear()
   
    return {day,month,year}
}

export const allDates = () => {
    const currentYear = new Date().getFullYear();
    const days:number[] = [];
    const months:string[] = [];
    const years:number[] = [];
    for(let i = 1;i<=31;i++) {
        days.push(i)
    }
    for (let i=0;i<12;i++) {
        const date = new Date(2024,i,1)
        months.push(date.toLocaleDateString(undefined,{month:"short"}))
    }
    for (let i=currentYear-100;i<=currentYear;i++) {
        years.push(i)
    }
    days.sort((a,b)=>a-b)
    years.sort((a,b)=>b-a)
    return {days,months,years}
}


export const getDayOfComment = (time:string) => {
    const date = new Date(time)
    const currentDate = new Date()
    const differenceMilliseconds = currentDate.getTime() - date.getTime()
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerMonth = millisecondsPerDay * 30; 
    const millisecondsPerYear = millisecondsPerDay * 365;

    if (differenceMilliseconds < millisecondsPerHour) {
        const differenceMinutes = Math.floor(differenceMilliseconds / millisecondsPerMinute);
        return `${differenceMinutes}m`;
    } else if (differenceMilliseconds < millisecondsPerDay) {
        // Less than a day
        const differenceHours = Math.floor(differenceMilliseconds / millisecondsPerHour);
        return `${differenceHours}h`;
    } else if (differenceMilliseconds < millisecondsPerMonth) {
        // Less than a month
        const differenceDays = Math.floor(differenceMilliseconds / millisecondsPerDay);
        return `${differenceDays}d`;
    } else if (differenceMilliseconds < millisecondsPerYear) {
        // Less than a year
        const differenceMonths = Math.floor(differenceMilliseconds / millisecondsPerMonth);
        return `${differenceMonths}m`;
    } else {
        // More than a year
        const differenceYears = Math.floor(differenceMilliseconds / millisecondsPerYear);
        return `${differenceYears}y`;
    }

}
