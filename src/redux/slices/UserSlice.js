import {createSlice} from "@reduxjs/toolkit"

const initialState={

    token:localStorage.getItem('authToken')||null
}


export const UserSlice=createSlice({

    name:'user',
    initialState:initialState,

    reducers:{ 
     
        userLogin:(state,action)=>{
             
          //setting token 
          localStorage.setItem('authToken',action.payload)

         //store to redux
          state.token=action.payload


             
        },
        userLogout:(state,action)=>{

             localStorage.removeItem('authToken')
             state.token=null
             
        }
        
    },
})


export const {userLogin,userLogout}=UserSlice.actions
export default UserSlice.reducer 