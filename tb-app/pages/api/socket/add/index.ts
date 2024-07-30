import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/lib/utils/types/socket";
import Servers from "@/lib/classes/Servers";
import axios from "axios";

import { NotificationType } from "@/lib/utils/types/notification";
const baseUrl = Servers.laravelURl
export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
    if(req.method !=="POST") {
        return res.status(401).json({"messaga":"method not allowed"})
    }

    const data = await req.body
    const {user,friend} = data

    try {
        const resp = await axios.post(`${baseUrl}/sendRequest`,{
            user,
            friend
        })
        if(resp.data) {
            const notifKey = `${user}-key`
            res.socket.server.io.emit(resp.data,notifKey)
            return res.status(200).json({"status":"request"})
        }
    } catch (error) {
        
        return res.status(500).json(error)
    }
} 