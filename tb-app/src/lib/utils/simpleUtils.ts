


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

