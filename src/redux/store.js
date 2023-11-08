import { configureStore } from "@reduxjs/toolkit";
import CommonSlice from './api/api'
import UserSlice from "./slices/UserSlice";
console.log('reached the redux store')
export const store=configureStore({

    reducer:{
     
        
        common:CommonSlice,
        userSlice:UserSlice

    }

})

