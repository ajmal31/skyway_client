import axios from "axios";
const adminAxiosInstance=axios.create();

//configuring in the request interceptor
adminAxiosInstance.interceptors.request.use(
    
        (config)=>{
    
            //get token from cookies
            const token=localStorage.getItem('adminToken')
            console.log('admin Token',token)
            if(token){
    
                config.headers['Authorization']=`bearer ${token}`
                config.headers['Content-Type']='application/json'
                
    
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