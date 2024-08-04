import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/lib/utils/types/socket";
import axios from "axios";
import Servers from "@/lib/classes/Servers";

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
    const {content,medias,userId,convoId,otherId} =  data
    try {
        const response = await axios.post(`${baseUrl}/sendMsg`,{
            convo_id:convoId,
            sender:userId,
            receiver:otherId,
            reaction:null,
            content:content,
            medias:medias
        })
        if(response.data) {
           
            const key = `${convoId}-message-key`
            res?.socket?.server?.io?.emit(key,response.data.data)
            info.success = true
            info.error = ""
            return res.status(200).json({sucuss:true})
        }
    } catch (error:any) {
        info.success=false,
        info.error="Error in server,try again later"
        return res.status(500).json(info)
    }

}