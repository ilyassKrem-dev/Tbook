
import Servers from "./Servers";
import axios from "axios";


const baseUrl = Servers.laravelURl


class Misc {

    static async getUserNotifications(user_id:string) {
        let data = {
            success:false,
            error:'',
            data:[]
        }
        try {
            const res = await axios.get(`${baseUrl}/${user_id}/notifications`)
            if(res) {
                data = {
                    success:true,
                    error:"",
                    data:res.data.data
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
    static async getAiMessages(user_id:string,gender:string) {
        let data = {
            success:false,
            error:'',
            data:[] as any[]
        }
        try {
            const res = await axios.get(`${baseUrl}/${user_id}/ai_messages`)
         
            if(res) {
                let msgs:any[] = res.data.data.map((msg:any) => {
                    return {
                        role: msg.sender === 100 ? "assistant" : "user",
                        content: msg.content,
                    };
                })
                msgs.unshift(
                    {role:"system",
                    content:`You’re a ${gender==="male"?"female":"male"} stranger who chats with the user. If you don’t understand a prompt, say 'I didn’t understand.'`}
                )
                data = {
                    success:true,
                    error:"",
                    data:msgs
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
    static async ResetAiMessages(user_id:string) {
        let data = {
            success:false,
            error:'',
            data:""
        }
        try {
            const res = await axios.delete(`${baseUrl}/${user_id}/ai_messages`)
         
            if(res) {
                data = {
                    success:true,
                    error:"",
                    data:res.data.data
                }
                return data
            } 
            
        } catch (error:any) {
         
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:"",
                    error:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    error:err,
                    data:""
                }
                
                return data
            }
        }
    }
}


export default Misc