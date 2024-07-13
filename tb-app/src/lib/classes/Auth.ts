
import { SignInInfoType,LoginInfoType } from "../utils/types/auth"
import axios from "axios"
import Servers from "./Servers"

class Auth {

    static async signIn(info:SignInInfoType) {
        const {name,username,email,password,password_confirm,date,gender} = info
        const baseUrl = Servers.laravelURl
        let data = {
            success:false,
            email:""||null,
            errors:{
                name:"",
                email:"",
                username:"",
                password:"",
                password_confirm:"",
                date:"",
                gender:""
            }
        }

        try {
            const res = await axios.post(`${baseUrl}/signin`,{
                name,
                email,
                username,
                password,
                password_confirm,
                birthdate:`${date.day}-${date.month}-${date.year}`,
                gender
            })
            return {success:true,email:res.data.email}
        } catch (error:any) {
            if(error.message !== "Request failed with status code 422") {
                return {
                    success:null,
                    errors:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data.errors
                data = {
                    success:false,
                    email:null,
                    errors:{
                        name:err.name ? err.name[0]:"",
                        email:err.email ?err.email[0]:"",
                        username:err.username ?err.username[0]:"",
                        password:err.password ?err.password[0]:"",
                        password_confirm:err.password_confirm ?err.password_confirm[0]:"",
                        date:err.birthdate ?err.birthdate[0]:"",
                        gender:err.gender ?err.gender[0]:""
                    }
                }
                
                return data
            }
            
        }
       
    }

    static async login(info:LoginInfoType) {
        const {email,password} = info
        const baseUrl = Servers.laravelURl
        let data = {
            success:false,
            email:""||null,
            errors:{
                email:"",
                password:"",
            }
        }

        try {
            const res = await axios.post(`${baseUrl}/login`,{
                email,
                password
            })
            
            return {success:true,email:res.data.email}
        } catch (error:any) {
           
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    errors:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    email:null,
                    errors:{
                        email:err.email ?err.email:"",
                        password:err.password ?err.password:"",
                    }
                }
                
                return data
            }
            
        }
       
    }
}

export default Auth