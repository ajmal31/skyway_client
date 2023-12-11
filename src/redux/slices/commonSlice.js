import { createSlice } from "@reduxjs/toolkit"
import {fetchData} from "../api/api"
//common slice handle data status
const commonSlice=createSlice({

    name:'common',
    initialState:{

        data:null,
        loader:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{

        builder
        .addCase(fetchData.pending,(state)=>{

            state.loader=true
        })
        .addCase(fetchData.fulfilled,(state,action)=>{
            
            
            state.data=action.payload.data
            
        })
        .addCase(fetchData.rejected,(state,action)=>{
            console.log('error happend here rejected state',action.payload)
          
           state.error=action.payload         
       })
    }
})

export default commonSlice.reducer