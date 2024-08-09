import Servers from "@/lib/classes/Servers";
import axios from "axios";
import { NextApiResponseServerIo } from "@/lib/utils/types/socket";
import { NextApiRequest } from "next";


const baseUrl = Servers.laravelURl
export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
    let info= {
        success:false,
        error:""
    }
    if(req.method!=="POST") {
        info.error = "Method not allowed"
        return res.status(401).json(info)
    }
    const data = await req.body
    const {user_id,convo_id} = data
    try {
        const response = await axios.post(`${baseUrl}/setAllSeen`,{
            convo_id,
            user_id
        })
        if(response.data) {
            info.success = true
            info.error = ""
            const key = `${convo_id}-seen-key`
            res?.socket?.server?.io?.emit(key,response.data.data)
            return res.status(200).json(info)
        }
    } catch (error) {

        info.success = false
        info.error = "Internal server error"
        return res.status(500).json(info)
    }
}