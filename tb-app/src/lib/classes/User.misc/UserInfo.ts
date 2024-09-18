import axios from "axios";
import User from "../User";
import Servers from "../Servers";

type InfoChange = {
    value:string;
    name:"name"|"username"|"phone"
}
type PasswordsType = {
    old:string;
    newP:string;
    confirmP:string
}
const LaravelURL = Servers.laravelURl
class UserInfo extends User {

    async changeName({value,name}:InfoChange) {
        let data = {
            success:false,
            error:"",
            msg:"",
            data:""
        }
        try {
            const res = await axios.put(`${LaravelURL}/${this.username}/update`,{
                name,
                value
            })
            if(res.data) {
                const response= res.data
                data.success = true
                data.error = response.error??""
                data.msg = response.msg??""
                data.data = response.data??""
                return data 
            }
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    msg:null,
                    error:"Internal server error",
                    data:""
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    msg:"",
                    error:err.message,
                    data:""
                }
                
                return data
            }
        }
    }
    async changePassword(passwords:PasswordsType) {
        let data = {
            success:false,
            errors:{
                old:"",
                newP:"",
                confirmP:''
            },
            msg:"",
        }
        try {
            const res = await axios.put(`${LaravelURL}/${this.username}/update/password`,passwords)
            if(res.data) {
                const response= res.data
                data.success = true
                data.errors = response.error??""
                data.msg = response.msg??""
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
                    errors:err.error
                }
                
               
                
                return data
            }
        }
    }
    static async getMoreInfo(userId:string) {
        let data = {
            success:false,
            error:"",
            data:undefined,
        }
        try {
            const res = await axios.get(`${LaravelURL}/profile/${userId}/info`)
            if(res.data) {
                const response= res.data
                data.success = true
                data.error = response.error??""
                data.data = response.data??undefined
                return data 
            }
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    data:undefined,
                    error:"Internal server error",
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    data:undefined,
                    error:err.error
                }
                
               
                
                return data
            }
        }
    }
    static async updateInfo(userId:string,value:string,type:string) {
        let data = {
            success:false,
            error:"",
            msg:"",
        }
        try {
            const res = await axios.put(`${LaravelURL}/profile/${userId}/info/update`,{
                value,
                type
            })
            if(res.data) {
                const response= res.data
                data.success = true
                data.error = response.error??""
                data.msg = response.msg??""
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
                    error:err.error
                }
                
               
                
                return data
            }
        }
    }
    static async deleteInfo(userId:string,type:string) {
        let data = {
            success:false,
            error:"",
            msg:"",
        }
        try {
            const res = await axios.patch(`${LaravelURL}/profile/${userId}/info/delete`,{
                type
            })
            if(res.data) {
                const response= res.data
                data.success = true
                data.error = response.error??""
                data.msg = response.msg??""
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
                    error:err.error
                }
                
               
                
                return data
            }
        }
    }
    static async updateStatus(userId:string,status:string) {
        let data = {
            success:false,
            error:"",
        }
        try {
            const res = await axios.patch(`${LaravelURL}/${userId}/status`,{
                status
            })
            if(res.data) {
                const response= res.data
                data.success = true
                data.error = response.error??""
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
                    error:err.error
                }
                
               
                
                return data
            }
        }
    }   
}


export default UserInfo 