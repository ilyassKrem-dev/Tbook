
import Servers from "./Servers";
import axios from "axios";


const baseUrl = Servers.laravelURl

class Friend {
    
    static async getUserStatus(user_id:string,profile_id:string) {
        let data = {
            success:false,
            error:'',
            data:undefined
        }
        try {
            const res = await axios.post(`${baseUrl}/${profile_id}/getFriendStatus`,{
                user_id
            })
            if(res) {
                data = {
                    success:true,
                    error:"",
                    data:res.data.status
                }
              
                return data
            } 
            
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:null,
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
    static async removeFriend(user_id:string,profile_id:string,type:string) {
        let data = {
            success:false,
            error:''
        }
        try {
            const res = await axios.post(`${baseUrl}/removeFriend`,{
                user_id,
                profile_id,
                type
            })
            if(res) {
                data = {
                    success:true,
                    error:""
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
    static async addFriend(user_id:string,profile_id:string) {
        let data = {
            success:false,
            error:''
        }
        try {
            const res = await axios.post(`${baseUrl}/addFriend`,{
                user_id,
                profile_id
            })
            if(res) {
                data = {
                    success:true,
                    error:""
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
    static async getAllFriends(user_id:string) {
        let data = {
            success:false,
            error:'',
            data:[]
        }
        try {
            const res = await axios.get(`${baseUrl}/${user_id}/friends`)
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
    static async getAllFriendsAndRequest(user_id:string) {
        let data = {
            success:false,
            error:'',
            data:[]
        }
        try {
            const res = await axios.get(`${baseUrl}/${user_id}/allfriends`)
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
    static async getUserRequests(user_id:string) {
        let data = {
            success:false,
            error:'',
            data:[]
        }

        try {
            const res = await axios.get(`${baseUrl}/${user_id}/userRequests`)
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

export default Friend
