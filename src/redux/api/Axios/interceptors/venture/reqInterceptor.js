
import axios from "axios";
const ventureAxiosInstance=axios.create();

//configuring in the request interceptor
ventureAxiosInstance.interceptors.request.use(
        (config)=>{
    
            //get token from cookies
            const token=localStorage.getItem('ventureToken')
            if(token){
    
                config.headers['Authorization']=`bearer ${token}`
                // config.headers['Content-Type']='application/json'
               
               
            }else{
                console.log('please be login')
                document.location.href="/venture/login"
            }
            return config
        },(error)=>{
    
            return Promise.reject(error)
        }
);

export default ventureAxiosInstance