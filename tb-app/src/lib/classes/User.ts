import axios from "axios"
import Servers from "./Servers"
class User {
    private username:string


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
            const res = await axios.post(`${Servers.laravelURl}/getuser`,{
                username:this.username
            })

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

}


export default User