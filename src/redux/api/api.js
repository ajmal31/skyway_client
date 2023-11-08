import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
console.log('reach the api calling redux phase')
import Cookies from 'js-cookie'


//get token from cookies

export const getToken=()=>{
  
    const token=localStorage.getItem('authToken')
    return token

}

//create an axios instance
const axiosInstance=axios.create();

//adding request interceptors axios
axiosInstance.interceptors.request.use(
    (config)=>{

        //get token from cookies
        const token=getToken()
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

            let response=await axiosInstance[method](url,data)
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
            
            console.log('error happend hear fullfilled',action.payload)
            state.data=action.payload.data
            console.log('after desrelaization ',state.data)
        })
        .addCase(fetchData.rejected,(state,action)=>{
            console.log('error happend here rejected state')
          
           state.error=action.payload         
       })
    }
})

export default CommonSlice.reducer