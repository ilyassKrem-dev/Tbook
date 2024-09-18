
import axios, { AxiosResponse } from "axios";
import Servers from "./Servers"

const baseUrl = Servers.laravelURl

class ConvoClass {
    static async  getConvo({user_id,other_id,convo_id}:{
        user_id?:string;
        other_id?:string;
        convo_id?:string
    }) {
        let data ={
            success:false,
            data:undefined,
            error:""
        }
        try {
            let res:AxiosResponse<any,any>
            if(convo_id) {
                res = await axios.get(`${baseUrl}/${user_id}/convo/${convo_id}`)
            } else {
                res = await axios.post(`${baseUrl}/getConvo`,{
                    user_id,
                    other_id
                })
            }
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
    static async  getAllConvos(userId:string) {
        let data ={
            success:false,
            data:[],
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/${userId}/convos`)
          
            if(res.data) {
                const convos = res.data.data

                data = {
                    success:true,
                    data:convos,
                    error:""
                }
                return data
            }
        } catch (error:any) {
           
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:[],
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