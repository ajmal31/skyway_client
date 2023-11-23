import axios from "axios";
console.log('api call  interceptor and instance venutre')
const adminAxiosInstance=axios.create();

//configuring in the request interceptor
adminAxiosInstance.interceptors.request.use(
        (config)=>{
    
            //get token from cookies
            const token=localStorage.getItem('adminToken')
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

export default adminAxiosInstance