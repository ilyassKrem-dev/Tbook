import axios from "axios"
import Servers from "./Servers"
const baseUrl = Servers.laravelURl


class Profile {

    static async ChangePicture(user_id:string,image:string) {
        let data = {
            success:false,
            error:'',
            msg:""
        }
        try {
            const res = await axios.put(`${baseUrl}/changePicture`,{
                user_id,
                image
            })
            if(res) {
                data = {
                    success:true,
                    error:"",
                    msg:res.data.message
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
    static async checkProfilePrivacy(userId:string,profileId:string) {
        let data = {
            success:false,
            data:false,
            error:''
        }
        try {
            const res = await axios.get(`${baseUrl}/${userId}/profile/${profileId}/checkRequestPrivacy`)
            
            if(res.data) {
                data = {
                    success:true,
                    data:res.data.data,
                    error:"",
                }
                return data
            } 
            
        } catch (error:any) {
            
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:false,
                    error:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    data:false,
                    error:err
                }
                
                return data
            }
        }
        
    }
}


export default Profile