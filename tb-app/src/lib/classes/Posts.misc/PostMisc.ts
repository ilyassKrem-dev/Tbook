import axios from "axios"
import Servers from "../Servers"


const baseUrl = Servers.laravelURl

class PostMisc {


    static async sharePost({
        postId,
        user_id,
        content
    }:{
        postId:string,
        user_id:string,
        content:string
    }) {
        let data = {
            success:false,
            error:'',
        }
        try {
            const res = await axios.post(`${baseUrl}/post/${postId}/share`,{
                user_id,
                content:content ? content :null
            })
       
            if(res.data) {
                data = {
                    success:true,
                    error:"",
                }
                return data
            } 
            
        } catch (error:any) {
            
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    error:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    error:err
                }
                
                return data
            }
        }
    }
}


export default PostMisc