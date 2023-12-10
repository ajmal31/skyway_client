import { createSlice } from "@reduxjs/toolkit";

const initialState={
    oppsitePersonData:null
}

const chatSlice=createSlice({
    name:'chat_slice',
    initialState:initialState,
    reducers:{

        selectedUser:(state,action)=>{
            const {senderId,receiverId}=action.payload
            console.log('enter the selcted user slice action',senderId,receiverId)

            state.oppsitePersonData=action.payload

            console.log('actionssss',state)

        }
    }

})
export const {selectedUser}=chatSlice.actions
export default chatSlice.reducer
