import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './Axios/interceptors/reqInterceptor.js'
import axios from 'axios'

console.log('calling api aync thunk')

//async thunk redux toolkit this will be handle 
export const fetchData=createAsyncThunk('fetchData',async(obj)=>{
    try{ 
        console.log('enter the thunk',obj)
        const url=obj?.url
        const method=obj?.method
        const data=obj?.data
        const token= obj?.token
        //here will  be hanlde some apis not complusory if user is logged in or not ..so in this case
        //if token is false (upcoming data ) that apis not mandatory is check whether used is logged in or not
        //if token is true should be check whether user is logged in if user not logged in redirect to login page
    
        if(token){
            
            if(method==='get'){
                let response=await axiosInstance[method](url)
                

                 return response
            }else{
                let response =await axiosInstance[method](url,data)
                
                return response
            }
   

        }else{
            console.log('enter unless token ')
            if(method==='get'){
                console.log('enter here',method,url)
                let response =await axios[method](url)
                return response
            }else{
                console.log('enter post  here',method,url)
                let response=await axios[method](url,data)
                console.log('response of unless token apicalls (exclude get method)')
                return response
            }
            
        }
        
    }catch(err){
        
        console.log(`erro occured while invoking api${url}`)
        return err

    }

})
