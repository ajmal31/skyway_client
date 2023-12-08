import { createSlice } from "@reduxjs/toolkit";

const initialState={
    senderId:null,
    receiverId:null
}

const chatSlice=createSlice({
    name:'chat_slice',
    initialState:initialState,
    reducers:{

        selectedUser:(state,action)=>{
            const {senderId,receiverId}=action.payload
            console.log('enter the selcted user slice action',senderId,receiverId)

            state.senderId=senderId
            state.receiverId=receiverId

            console.log('actionssss',state)

        }
    }

})
export const {selectedUser}=chatSlice.actions
export default chatSlice.reducer
