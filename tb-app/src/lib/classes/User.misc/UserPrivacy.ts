import axios from "axios"
import Servers from "../Servers"



const baseUrl = Servers.laravelURl

class UserPivacy {
    protected id:string
    constructor(id:string) {
        this.id = id
    }
    async getuserPrivacy() {
        let data = {
            success:false,
            error:"",
            data:null
        }
        try {
            const res = await axios.get(`${baseUrl}/profile/${this.id}/privacy`)
            if(res.data) {
                data.success=true;
                data.data = res.data.data
                return data
            }
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:null,
                    error:"Internal server error",
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    data:null,
                    error:err.message,
                   
                }
                
                return data
            }
        }
        
    }
    async updatePostsPrivacy(viewPosts:"public"|"friends"|"me") {
        let data = {
            success:false,
            error:"",
        }
        try {
            const res = await axios.patch(`${baseUrl}/profile/${this.id}/privacy/posts/view`,{
                posts:viewPosts
            })
            if(res.data) {
                data.success=true;
                return data
            }
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    error:"Internal server error",
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    error:err.message,
                   
                }
                
                return data
            }
        }
        
    }
    async updateRequestsPrivacy(viewRequess:"all"|"fff") {
        let data = {
            success:false,
            error:"",
        }
        try {
            const res = await axios.patch(`${baseUrl}/profile/${this.id}/privacy/contact/requests`,{
                requests:viewRequess
            })
           
            if(res.data) {
                data.success=true;
                return data
            }
        } catch (error:any) {
         
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    error:"Internal server error",
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    error:err.message,
                   
                }
                
                return data
            }
        }
        
    }
}


export default UserPivacy
