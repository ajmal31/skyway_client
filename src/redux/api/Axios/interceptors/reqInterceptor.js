import axios from "axios";
console.log('api call  interceptor and instance')
const axiosInstance=axios.create();

//configuring in the request interceptor
axiosInstance.interceptors.request.use(
        (config)=>{
    
            //get token from cookies
            const token=localStorage.getItem('authToken')
            if(token){
    
                config.headers['Authorization']=`bearer ${token}`
                config.headers['Content-Type']='application/json'
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

export default axiosInstance