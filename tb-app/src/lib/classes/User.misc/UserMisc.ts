import User from "../User";
import Servers from "../Servers";
import axios from "axios";


const baseUrl = Servers.laravelURl

class UserMisc extends User {

    async getconvoUsers(search:string|null) {
        let data = {
            success:false,
            error:"",
            msg:"",
            data:[]
        }
        try {
            const res = await axios.get(`${baseUrl}/${this.username}/get_unblocked${search?`?search=${search}`:""}`)
            if(res.data) {
                data.success = true
                data.data = res.data.data
                return data
            }
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    msg:"",
                    error:"Internal server error",
                    data:[]
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    msg:"",
                    error:err.message,
                    data:[]
                }
                
                return data
            }
        }
    }
    async getBlockedconvoUsers(search:string|null) {
        let data = {
            success:false,
            error:"",
            msg:"",
            data:[]
        }
        try {
            const res = await axios.get(`${baseUrl}/${this.username}/get_blocked${search?`?search=${search}`:""}`)
            if(res.data) {
                data.success = true
                data.data = res.data.data
                return data
            }
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    msg:"",
                    error:"Internal server error",
                    data:[]
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    msg:"",
                    error:err.message,
                    data:[]
                }
                
                return data
            }
        }
    }
    async blockUser(convo_id:number,type:string) {
        let data = {
            success:false,
            error:"",
            msg:"",
        }
        try {
            const res = await axios.post(`${baseUrl}/${this.username}/block`,{
                convo_id,
                type
            })
            if(res.data) {
                data.success = true
                data.msg = res.data.msg
                return data
            }
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    msg:"",
                    error:"Internal server error",
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    msg:"",
                    error:err.message,
                   
                }
                
                return data
            }
        }
    }
    
}

export default UserMisc