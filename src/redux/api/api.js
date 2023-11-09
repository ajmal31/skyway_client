import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//create an axios instance
const userAxiosInstance=axios.create();

//adding request interceptors axios
userAxiosInstance.interceptors.request.use(
    (config)=>{

        //get token from cookies
        const token=localStorage.getItem('authToken')
        if(token){

            config.headers['Authorization']=`bearer ${token}`
            console.log(config.headers)

        }else{

            console.log('please be login ')
            console.log('/userLogin')
        }
        return config
    },(error)=>{

        return Promise.reject(error)
    }
);

//async thunk redux toolkit this will be handle 
export const fetchData=createAsyncThunk('fetchData',async(obj)=>{
    try{ 
        const url=obj?.url
        const method=obj?.method
        const data=obj?.data
        const token= obj?.token
        //here will  be hanlde some apis not complusory if user is logged in or not ..so in this case
        //if token is false (upcoming data ) that apis not mandatory is check whether used is logged in or not
        //if token is true should be check whether user is logged in if user not logged in redirect to login page
        if(token){

            let response=await userAxiosInstance[method](url,data)
            return response

        }else{
            let response=await axios[method](url,data)
            return response
        }
        
    }catch(err){

        console.log(`erro occured while invoking api${url}`)

    }

})

//common slice handle data status
const CommonSlice=createSlice({

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
            console.log('error happend here rejected state')
          
           state.error=action.payload         
       })
    }
})

export default CommonSlice.reducer