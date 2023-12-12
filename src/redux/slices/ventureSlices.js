import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie"

const initialState={

    ventureToken:localStorage.getItem('ventureToken')||null,
    ventureName:localStorage.getItem('venutureName')||null,
    pending:localStorage.getItem('pending')||null
   
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
            localStorage.setItem('pending',ventureStatus)
            
            // state.ventureToken=ventureToken
            state.ventureName=ventureName
            state.ventureToken=ventureToken
            state.pending=pending

        },
        changeVentureStatus:(state,action)=>{

            localStorage.setItem('pending',false)
            state.pending="false"
        },
        ventureLogout:(state,action)=>{

            localStorage.removeItem('ventureToken')
            localStorage.removeItem('ventureName')
            localStorage.removeItem('pending')
            cookie.remove('ventureId')

            state.ventureName=null
            state.ventureToken=null
            state.pending=null


        }
        
    }

})

export const{ventureLogin,changeVentureStatus,ventureLogout}=ventureSlice.actions
export default ventureSlice.reducer
    
   

