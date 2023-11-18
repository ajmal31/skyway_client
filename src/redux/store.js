import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./api/Axios/commonSlice";
import UserSlice from "./slices/UserSlice";
import ventureSlices from "./ventureSlices";
export const store=configureStore({

    reducer:{
     
        
        common:commonSlice,
        UserSlice:UserSlice,
        ventureSlices:ventureSlices


    }

})

