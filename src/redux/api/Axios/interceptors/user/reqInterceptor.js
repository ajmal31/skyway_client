import axios from "axios";
const userAxiosInstance=axios.create();

//configuring in the request interceptor
userAxiosInstance.interceptors.request.use(
        (config)=>{
    
            //get token from cookies
            const token=localStorage.getItem('authToken')
            if(token){
    
                config.headers['Authorization']=`bearer ${token}`
                // config.headers['Content-Type']='application/json'
                console.log(config.headers)
               console.log('header completed')
            }else{
    
                console.log('please be login ')
                console.log('/userLogin')
            }
            return config
        },(error)=>{
    
            return Promise.reject(error)
        }
);

export default userAxiosInstance