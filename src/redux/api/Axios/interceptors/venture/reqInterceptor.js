import { useNavigate } from "react-router-dom";
import axios from "axios";

const ventureAxiosInstance = axios.create();

//configuring in the request interceptor

ventureAxiosInstance.interceptors.request.use(
    
    (config) => {

        //get token from cookies

        const token = localStorage.getItem('ventureToken')
        console.log('venture interceptor token ',token)
        if (token) {

            console.log('tooken inside interceptor',token)
            config.headers['Authorization'] = `bearer ${token}`
            // config.headers['Content-Type']='application/json'
            // config.headers['Accept']='application/json'
            
           

        } else {

           throw new Error("token not found")
            
        }
        return config
    }, (error) => {
        console.log('no config ')
        return Promise.reject(error)
    }
);

export default ventureAxiosInstance