




import axios from "axios";
import Servers from "./Servers";



const baseUrl = Servers.laravelURl
class Comments {

    static async getCommments(postId:string) {
        try {
            const res = await axios.get(`${baseUrl}/${postId}/getComment`)
            return {
                success:true,
                data:res.data.comments || [],
                error:null}
        
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:null,
                    error:"Internal server error"
                }
            }
        }
    }
    static async addComment({user_id,post_id,content,parent_id}:{
        user_id:string;
        post_id:string;
        content:string;
        parent_id:string|null
    }) {
        let data = {
            success:false,
            error:''||null,
            data:[]
        }
        try {
            const res = await axios.post(`${baseUrl}/addComment`,
            {
                user_id,
                post_id,
                content,
                parent_id
            })
            if(res) {
                data = {
                    success:true,
                    error:null,
                    data:res.data.comment
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
                    error:error.response.data
                }
                
                return data
            }
        }
    }
    static async likeComment(userId:string,comment_id:string) {
        let data = {
            success:false,
            error:'',
            msg:""
        }
        try {
            const res = await axios.post(`${baseUrl}/likeComment`,{
                user_id:userId,
                comment_id
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
}



export default Comments