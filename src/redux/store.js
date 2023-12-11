import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/commonSlice";
import UserSlice from "./slices/UserSlice";
import ventureSlices from "./slices/ventureSlices";
import adminSlice from "./slices/adminSlice";
import chatSlice from "./slices/chatSlice";
export const store=configureStore({

    reducer:{
     
        
        common:commonSlice,
        UserSlice:UserSlice,
        ventureSlices:ventureSlices,
        adminSlice:adminSlice,
        chatSlice:chatSlice


    }

})

