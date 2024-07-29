
import Servers from "./Servers";
import axios from "axios";


const baseUrl = Servers.laravelURl


class Friend {

    static async getUserStatus(user_id:string,profile_id:string) {
        let data = {
            success:false,
            error:'',
            msg:""
        }
        try {
            const res = await axios.post(`${baseUrl}/${profile_id}/getFriendStatus`,{
                user_id
            })
            if(res) {
                data = {
                    success:true,
                    error:"",
                    msg:res.data.status
                }
                return data
            } 
            
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    msg:null,
                    error:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    msg:"",
                    error:err
                }
                
                return data
            }
        }
    }
}

export default Friend