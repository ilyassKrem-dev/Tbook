import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/lib/utils/types/socket";
import axios from "axios";
import Servers from "@/lib/classes/Servers";

const laravelURl = Servers.laravelURl
export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
     let info= {
        success:false,
        error:""
    }
    if(req.method !=="PATCH") {
        info.error = "Method not allowed"
        return res.status(500).json(info)
    }
    const data = await req.body
    const {convoId,user_id,status} = data

    try {
        const response = await axios.patch(`${laravelURl}/${convoId}/changeStatus`,{
            status,
            user_id
        })
        if(response.data) {
           
            info.success = true
            info.error = ""
       
            const key = `${convoId}-status-key`
            res?.socket?.server?.io?.emit(key,response.data.data)
            return res.status(200).json(info)
        }
    } catch (error) {
        
        info.success = false
        info.error="Internal server error"
        return res.status(500).json(info)
    }
}