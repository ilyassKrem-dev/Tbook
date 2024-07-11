import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options:NextAuthOptions = {
        providers:[
            CredentialsProvider({
                name:"credentials",
                credentials:{},
                //@ts-ignore
                async authorize(credentials)  {
                    const {email,password}  = credentials as {email:string,password:string}
                    try {
                        return email
                    } catch (error) {
                        throw new Error(`Error signing`)
                    }
                }
            })
        ],
        callbacks:{
            //@ts-ignore
            async session({session}) {
                try {
                    if(session&&session.user) {
                        let user = await('ze')
                       

                        return session
                    }
                    
                } catch (error) {
                    
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