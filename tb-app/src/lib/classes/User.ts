import axios from "axios"
import Servers from "./Servers"
const baseUrl = Servers.laravelURl
class User {
    protected username:string


    constructor(username:string) {
        this.username = username
    }

    async getUserData() {
        let data = {
            success:false,
            error:"",
            data:undefined
        }
        try {
            const res = await axios.get(`${baseUrl}/getuser/${this.username}`)
    
            return {
                success:true,
                error:"",
                data:res.data
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
                    data:undefined,
                    error:err.message
                }
                
                return data
            }
        }
    }
    static async addBio(userId:string,bio:string) {
        let data = {
            success:false,
            error:"",
            msg:""||null
        }
        try {
            const res = await axios.patch(`${baseUrl}/addBio`,{
                user_id:userId,
                bio
            })
            
            return res.data.message
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
                    msg:null,
                    error:err.message
                }
                
                return data
            }
        }
    }

    static async getUserPosts(userId:string) {
        let data = {
            success:false,
            error:"",
            data:[]||null
        }
        
        try {
            const res = await axios.get(`${baseUrl}/${userId}/getUserPosts`)
       
            return {
                success:true,
                error:"",
                data:res.data.posts
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
                    error:err.message
                }
                
                return data
            }
        }
    }

    static async getSearchResults(searchString:string) {
        let data = {
            success:false,
            error:"",
            data:[]||null
        }
        
        try {
            const res = await axios.get(`${baseUrl}/results?search=${searchString}`)
            return {
                success:true,
                error:"",
                data:res.data.data
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
                    error:err.message
                }
                
                return data
            }
        }
    }
}


export default User