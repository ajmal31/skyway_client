import { createSlice } from "@reduxjs/toolkit";

const initialState={

    ventureToken:localStorage.getItem('ventureToken')||null,
    ventureName:localStorage.getItem('venutureName')||null,
    venture_status:localStorage.getItem('venture_status')||null
   
}

export const ventureSlice=createSlice({

    name:'ventureSlice',
    initialState:initialState,

    reducers:{

        ventureLogin:(state,actions)=>{
           
            console.log('in redux',actions)
            const {pending,ventureName,ventureToken}=actions.payload
            const ventureStatus=pending
            
            localStorage.setItem('ventureToken',ventureToken)
            localStorage.setItem('ventureName',ventureName)
            localStorage.setItem('venture_status',ventureStatus)
            
            // state.ventureToken=ventureToken
            state.ventureName=localStorage.getItem('ventureName')
            state.ventureToken=localStorage.getItem('ventureToken')
            state.venture_status=localStorage.getItem('venture_status')

        }
    }

})

export const{ventureLogin}=ventureSlice.actions
export default ventureSlice.reducer
    
   

