import { createSlice } from "@reduxjs/toolkit";

const initialState={
    oppsitePersonData:null,
    chatId:null
}

const chatSlice=createSlice({
    name:'chat_slice',
    initialState:initialState,
    reducers:{

        selectedUser:(state,action)=>{
            console.log('data of the selected user or venture',action.payload)
            const {senderId,receiverId}=action.payload
           

            state.oppsitePersonData=action.payload

            console.log('current chat slice oppsotie person data',state.oppsitePersonData)

        },
        chatId:(state,action)=>{

        }
        
    }

})
export const {selectedUser,chatId}=chatSlice.actions
export default chatSlice.reducer
