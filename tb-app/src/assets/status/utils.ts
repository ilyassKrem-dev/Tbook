import { UserType } from "@/lib/utils/types/user";
import Servers from "@/lib/classes/Servers";
const baseurl = Servers.laravelURl

export const updateStatus = async(user:UserType|null,status:string) => {
    if (!user) return
    const url = `${baseurl}/${user.id}/status`;
    const data = JSON.stringify({ status });
    const blob = new Blob([data], { type: 'application/json' });
    navigator.sendBeacon(url, blob);
    
}