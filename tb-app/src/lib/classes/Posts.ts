
import axios from "axios";
import Servers from "./Servers";

type postData = {
    content:string|null;
    medias:any[];
    status:string;
    user_id:string
}
class Posts {

    static async addPost(postData:postData) {
        let data = {
            success:false,
            errors:''||null,
            msg:""
        }
        try {
            const res = await axios.post(`${Servers.laravelURl}/addpost`,postData)
            if(res) {
                data = {
                    success:true,
                    errors:null,
                    msg:res.data.message
                }
                return data
            } 
            
        } catch (error:any) {
            if(error.message != "Request failed with status code 400") {
                
                return {
                    success:null,
                    msg:null,
                    errors:"Internal server error"
                }
            }
            if(error && error.response && error.response.data) {
                const err = error.response.data
                data = {
                    success:false,
                    msg:"",
                    errors:error.response.data
                }
                
                return data
            }
        }
    }
}


export default Posts