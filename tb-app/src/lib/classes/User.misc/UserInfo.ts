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
}


export default UserInfo