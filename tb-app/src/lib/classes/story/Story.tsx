import axios from "axios";
import Servers from "../Servers";

const baseUrl = Servers.laravelURl;

type StoryType = {
    text:string|null;
    media:string|null;
    bgColor:string|null;
    textColor:"black"|"white";
    visibility:string;
    mediaClass:string;
    type:string
}

class Story {
    
    protected id:string;

    constructor(id:string) {
        this.id = id
    }


    async addStory(story:StoryType) {
        let data = {
            success:false,
            error:""
        }
        try {
            const res = await axios.post(`${baseUrl}/${this.id}/add_story`,story)
            if(res.data) {
                data.success = true
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
    async getHomeStories() {
        let data = {
            success:false,
            data:[],
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/${this.id}/stories`)
          
            if(res.data) {
                data.success = true
                data.data=res.data.data
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
    async getStories() {
        let data = {
            success:false,
            data:[],
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/${this.id}/stories/get`)
          
            if(res.data) {
                data.success = true
                data.data=res.data.data
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
    async getUsernameStories(username:string) {
        let data = {
            success:false,
            data:[],
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/${this.id}/stories/${username}`)
          
            if(res.data) {
                data.success = true
                data.data=res.data.data
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

export default Story