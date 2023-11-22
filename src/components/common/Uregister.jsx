
import { motion } from 'framer-motion'
import RegisterContent from '../user/register/RegisterContent';
import LoginContent from '../user/login/LoginContent';
import VloginContent from '../venture/Login/VloginContent';


function URegister(prop) {
   
    
    return (
        <div className=" bg-primary h-screen flex justify-center items-center ">


            <motion.div
                
                initial={{ scale: 0 }}
                
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}

                className="bg-secondory h-5/6 w-3/5 px-20 rounded-2xl  shadow-slate-800  text-center text-zinc-50  font-Outfit font-bold text-4xl pt-12 " >
                 {
                    prop.content==='login'?(<p className='text-gray-200'>Login</p>): prop.content==='register'? ( <p className='text-gray-200'>Create an Account</p>):prop.content==='ventureLogin'?(<p>Please Login Your Venture</p>):'no title'
                 } 
               
                 {
                    prop.content==='login'?(<LoginContent/>): prop.content==='register'? (<RegisterContent/>):prop?.content==='ventureLogin'?(<VloginContent/>):'no content'
                 }
                

            </motion.div>

        </div>
    )
                }
export default URegister