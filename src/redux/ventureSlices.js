import { createSlice } from "@reduxjs/toolkit";

const initialState={

    ventureToken:localStorage.getItem('ventureToken')||null
   
}

export const ventureSlice=createSlice({

    name:'ventureSlice',
    initialState:initialState,

    reducers:{

        ventureLogin:(state,actions)=>{
           
            console.log('in redux',actions)
            const ventureToken=actions.payload
            localStorage.setItem('ventureToken',ventureToken)
            
            state.ventureToken=ventureToken
          

        }
    }

})

export const{ventureLogin}=ventureSlice.actions
export default ventureSlice.reducer
    
   

