import Servers from "@/lib/classes/Servers";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/lib/utils/types/socket";
import axios from "axios";

const baseUrl = Servers.laravelURl
export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
    let info= {
        success:false,
        error:""
    }
    if(req.method !=="POST") {
        info.error="Method not"
        return res.status(401).json(info)
    }
    const data = await req.body
    const {reaction,message_id,user_id} = data
    try {
        const response = await axios.post(`${baseUrl}/addReaction`,{
            user_id,
            message_id,
            reaction
        })
        if(response.data) {
            
            info.success=true
            const data = response.data.data
       
            const key = `${data.convo_id}-reaction-key`
            res?.socket?.server?.io?.emit(key,data)
            return res.status(200).json(info)
        }
    } catch (error) {
        info.success=false
        info.error="Internal server error"
        return res.status(500).json(info)
    }
} 