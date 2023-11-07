import { configureStore } from "@reduxjs/toolkit";
import CommonSlice from './api/api'
console.log('reached the redux store')
export const store=configureStore({

    reducer:{
     
        
        common:CommonSlice

    }

})

