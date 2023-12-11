import { createAsyncThunk } from '@reduxjs/toolkit'
import userAxiosInstance from './Axios/interceptors/user/reqInterceptor.js'
import adminAxiosInstance from './Axios/interceptors/admin/reqInterceptor.js'
import ventureAxiosInstance from './Axios/interceptors/venture/reqInterceptor.js'
import axios from 'axios'


//async thunk redux toolkit this will be handle 
export const fetchData=createAsyncThunk('fetchData',async(obj)=>{
    try{ 
        const url=obj?.url
        const method=obj?.method
        const data=obj?.data
        const token= obj?.token
        const to=obj?.to
        //here will  be hanlde some apis not complusory if user is logged in or not ..so in this case
        //if token is false (upcoming data ) that apis not mandatory is check whether used is logged in or not
        //if token is true should be check whether user is logged in if user not logged in redirect to login page
    
        if(token){
            if(to==='user'){

                if(method==='get'){
                    let response=await userAxiosInstance[method](url)
                    
    
                     return response
                }else{
                    
                    let response =await userAxiosInstance[method](url,data)
                   
                    return response
                }

            }else if(to==='admin'){

                
                if(method==='get'){
                    let response=await adminAxiosInstance[method](url)

                     return response
                }else{
                    
                    let response =await adminAxiosInstance[method](url,data)
                    
                    return response
                }

            }else if(to==='venture'){

                
                if(method==='get'){
                   
                    let response=await ventureAxiosInstance[method](url)
                     return response
                }else{
                    let response =await ventureAxiosInstance[method](url,data)
                    
                    return response
                }

            }
            
   

        }else{
            
            if(method==='get'){
               
                let response =await axios[method](url)
                return response
            }else{
              
                let response=await axios[method](url,data)
                
                return response
            }
            
        }
        
    }catch(err){
        
        console.log(`erro occured while invoking api${url}`)
        return err

    }

})
