
import axios from "axios";
import Servers from "./Servers";

type postData = {
    content:string|null;
    medias:any[];
    status:string;
    user_id:string
}

const baseUrl = Servers.laravelURl
class Posts {

    static async addPost(postData:postData) {
        let data = {
            success:false,
            errors:''||null,
            data:undefined
        }
        try {
            const res = await axios.post(`${baseUrl}/addpost`,postData)
            if(res) {
                data = {
                    success:true,
                    errors:null,
                    data:res.data.data
                }
                return data
            } 
            
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:undefined,
                    errors:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    data:undefined,
                    errors:error.response.data
                }
                
                return data
            }
        }
    }

    static async changeLike(user_id:string,post_id:string) {
        let data = {
            success:false,
            error:'',
            msg:""
        }
        try {
            const res = await axios.post(`${baseUrl}/likePost`,{
                user_id,
                post_id
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
    static async getAllPosts(userId:string) {
        let data = {
            success:false,
            error:'',
            data:[]
        }
        try {
            const res = await axios.get(`${baseUrl}/${userId}/getAllPosts`)
            
            if(res.data) {
                data = {
                    success:true,
                    error:"",
                    data:res.data.posts
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
    static async getPost(profileUsername:string,postId:string) {
        let data = {
            success:false,
            error:'',
            data:undefined
        }
        try {
            const res = await axios.get(`${baseUrl}/profile/${profileUsername}/posts/${postId}`)
            
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
                    data:undefined,
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
    
}


export default Posts