import { createSlice } from "@reduxjs/toolkit";

const initialState={
    oppsitePersonData:null,
    chatId:null,
    count:0
}

const chatSlice=createSlice({
    name:'chat_slice',
    initialState:initialState,
    reducers:{

        selectedUser:(state,action)=>{
           
            const {senderId,receiverId}=action.payload
            state.oppsitePersonData=action.payload          

        },
        changeCount:(state,action)=>{

            state.count=action.payload
        }
        
    }

})
export const {selectedUser,changeCount}=chatSlice.actions
export default chatSlice.reducer
