import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie"

const initialState={

    ventureToken:localStorage.getItem('ventureToken')||null,
    ventureName:localStorage.getItem('venutureName')||null,
    admin_allowed:localStorage.getItem('admin_allowed')||null
   
}

export const ventureSlice=createSlice({

    name:'ventureSlice',
    initialState:initialState,

    reducers:{

        ventureLogin:(state,actions)=>{
           
            const {admin_allowed,ventureName,ventureToken}=actions.payload
            const ventureStatus=admin_allowed
            
            localStorage.setItem('ventureToken',ventureToken)
            localStorage.setItem('ventureName',ventureName)
            localStorage.setItem('admin_allowed',ventureStatus)
            
            // state.ventureToken=ventureToken
            state.ventureName=ventureName
            state.ventureToken=ventureToken
            state.admin_allowed=admin_allowed

        },
        changeVentureStatus:(state,action)=>{

            localStorage.setItem('admin_allowed',"allowed")
            state.admin_allowed="allowed"
        },
        ventureLogout:(state,action)=>{

            localStorage.removeItem('ventureToken')
            localStorage.removeItem('ventureName')
            localStorage.removeItem('admin_allowed')
            cookie.remove('ventureId')

            state.ventureName=null
            state.ventureToken=null
            state.admin_allowed=null


        }
        
    }

})

export const{ventureLogin,changeVentureStatus,ventureLogout}=ventureSlice.actions
export default ventureSlice.reducer
    
   

