import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import Servers from "@/lib/classes/Servers";
const options:NextAuthOptions = {
        providers:[
            CredentialsProvider({
                name:"credentials",
                credentials:{},
                
                async authorize(credentials)  {
                    const {email}  = credentials as {email:string,password:string}
                    try {
                        const res = await axios.post(`${Servers.laravelURl}/user`,{
                            email
                        })
                        if(res) {
                            return res.data
                        }
                        return null
                    } catch (error) {
                        throw new Error(`Error signing`)
                    }
                }
            })
        ],
        callbacks:{
            async session({session}) {
                try {
                    if(session&&session.user) {
                        const {email} = session.user
                        let user = await axios.post(`${Servers.laravelURl}/user`,{
                            email
                        })
                        const data = user?.data
                        session.user.name = data.name
                        session.user.email = data.email
                        session.user.image = data.image
                        //@ts-ignore
                        session.user.status = data.status
                        //@ts-ignore
                        session.user.username = data.username

                        return session
                    }
                    return session
                } catch (error) {
                    return session
                }
                

            },
            async jwt({token,user,trigger,session}) {
                if(trigger =="update") {
                  return {...token,...session.user}
                }
                return {...token,...user}
              }
            }
        }


export default options