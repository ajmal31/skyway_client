import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:localStorage.getItem('adminToken')||null,
    email:localStorage.getItem('admin_email')||null
}

const adminSlice=createSlice({
    name:"admin_slice",
    initialState:initialState,
    

    reducers:{

        adminLogin:(state,action)=>{
         
            const {email,token}=action.payload
            localStorage.setItem('adminToken',token)
            localStorage.setItem('admin_email',email)
            state.email=email
            state.token=token
        },
        adminLogout:(state,action)=>{
            
            localStorage.removeItem('adminToken')
            localStorage.removeItem('admin_email')
            state.email=null
            state.token=null
        }

    }
})
export const{adminLogin,adminLogout}=adminSlice.actions
export default adminSlice.reducer