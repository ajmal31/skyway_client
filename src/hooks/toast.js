import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const useme=(content,status)=>{
    
    toast[status](content, { position: 'top-center', className: "font-Outfit bg-gray-300  text-sm" })
    

}