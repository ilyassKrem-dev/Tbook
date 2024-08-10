
import axios from "axios";
import Servers from "./Servers"

const baseUrl = Servers.laravelURl

class ConvoClass {
    static async  getConvo({user_id,other_id}:{
        user_id:string;
        other_id:string;
    }) {
        let data ={
            success:false,
            data:undefined,
            error:""
        }
        try {
            const res = await axios.post(`${baseUrl}/getConvo`,{
                user_id,
                other_id
            })
            if(res.data) {
                const convo = res.data.data
                data = {
                    success:true,
                    data:res.data.data,
                    error:""
                }
                return data
            }
        } catch (error:any) {
           
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:null,
                    error:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    data:undefined,
                    error:err
                }
                
                return data
            }
        }
    } 
    static async  getMoreMsgs({convoId,lastMsgId}:{
        convoId:string;
        lastMsgId:string;
    }) {
        let data ={
            success:false,
            data:[],
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/${convoId}/messages/${lastMsgId}`)
            if(res.data) {
                const msgs = res.data.data

                data = {
                    success:true,
                    data:msgs,
                    error:""
                }
                return data
            }
        } catch (error:any) {
            
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:null,
                    error:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    data:[],
                    error:err
                }
                
                return data
            }
        }
    }      
}

export default ConvoClass