import { ConvoType, MessageType } from '@/lib/utils/types/convo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConvoState {
    convos:ConvoType[];
    sideConvos:ConvoType[]
}

const initialState:ConvoState = {
    convos:[],
    sideConvos:[]
}


const convoSlice = createSlice({
    name:"convo",
    initialState,
    reducers:{
        addConvo(state,action:PayloadAction<ConvoType>) {
            state.convos.unshift(action.payload)
        },
        addMessage(state,action:PayloadAction<MessageType>) {
            const findConvo = state.convos.find(convo=>convo.id===action.payload.convo_id)
            if(findConvo) {
                state.convos = state.convos.map((convo) => {
                    if(convo.id !== action.payload.convo_id) return convo
                    return {...convo,messages:[...convo.messages,action.payload]}
                })

            } else {
                state.sideConvos = state.sideConvos.map((convo) => {
                    if(convo.id !== action.payload.convo_id) return convo
                    return {...convo,messages:[...convo.messages,action.payload]}
                })
            }
        },
        handleMoreMsgs(state,action:PayloadAction<{msgs:MessageType[],convoId:string}>) {
            state.convos = state.convos.map(convo => {
                if(convo.id!==action.payload.convoId) return convo
                return {...convo,messages:[...action.payload.msgs,...convo.messages]}
            })
        },
        addReaction(state,action:PayloadAction<{convo_id:string,reaction:string,id:string}>) {
            state.convos = state.convos.map(convo=>{
                if(convo.id !== action.payload.convo_id) return convo
                const newData = convo.messages.map(msg => msg.id===action.payload.id ? {...msg,reaction:action.payload.reaction}:msg)
                return {...convo,messages:newData}
            })
        },
        addSeen(state,action:PayloadAction<{convo_id:string,seen:boolean,receiver:string}>) {
            const findConvo = state.convos.find(convo=>convo.id===action.payload.convo_id)
            if(findConvo) {
                state.convos = state.convos.map(convo => {
                    if(convo.id !== action.payload.convo_id) return convo
                    const newData = convo.messages.map(msg => {
                        if(msg.receiver!==action.payload.receiver ||msg.seen) return msg
                        return {...msg,seen:action.payload.seen}
                    })
                    return {...convo,messages:newData}
                })

            } else {
                state.sideConvos = state.sideConvos.map(convo => {
                    if(convo.id !== action.payload.convo_id) return convo
                    const newData = convo.messages.map(msg => {
                        if(msg.receiver!==action.payload.receiver ||msg.seen) return msg
                        return {...msg,seen:action.payload.seen}
                    })
                    return {...convo,messages:newData}
                })
            }
        },
        changeStatus(state,action:PayloadAction<{convo_id:string,status:string,status_by:string}>) {
            state.convos = state.convos.map(convo => {
                if(convo.id!==action.payload.convo_id) return convo
                return {...convo,
                    status:action.payload.status,
                    status_by:action.payload.status_by
                
                }
            })
        },
        moveConvoToSide(state,action:PayloadAction<ConvoType>) {
            state.convos = state.convos.filter(convo=>convo.id !==action.payload.id)
            state.sideConvos.unshift(action.payload)
        },
        removeConvo(state,action:PayloadAction<{id:string}>) {
            state.convos = state.convos.filter(convo=>convo.id!==action.payload.id)
        },
        moveToConvos(state,action:PayloadAction<ConvoType>) {
            state.convos = [action.payload,...state.convos]
            state.sideConvos = state.sideConvos.filter((convo) => convo.id !== action.payload.id)
        },
        removeSideConvo(state,action:PayloadAction<{id:string}>) {
            state.sideConvos = state.sideConvos.filter(convo=>convo.id !== action.payload.id)
        },
        resetAiMsgs(state,action:PayloadAction<{id:string}>) {
            state.convos = state.convos.map((convo) => {
                if(convo.id !== action.payload.id) return convo
                return {...convo,messages:[]}
            })
        },
        resetState(state){
            return initialState
        }
     }
})

export const {addConvo,moveConvoToSide,removeSideConvo,moveToConvos,addMessage,addReaction,addSeen,changeStatus,handleMoreMsgs,removeConvo,resetAiMsgs} = convoSlice.actions

export default convoSlice.reducer