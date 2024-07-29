
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

}


export default Misc