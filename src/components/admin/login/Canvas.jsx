import { motion } from 'framer-motion'
import { useState } from 'react'
import { fetchData } from '../../../redux/api/api'
import { useDispatch } from 'react-redux'
import { ADMIN_SRV_BASE_URL } from '../../../data/const'
import { useme } from '../../../hooks/toast'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../../redux/slices/adminSlice'
const Canvas = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [cred,setCred]=useState({
        email:'',
        password:''
    })
    const handlSubmit=async(e)=>{

        e.preventDefault()
        console.log(cred)
        const apiData={
            method:'post',
            url:ADMIN_SRV_BASE_URL+'login',
            data:cred,
            token:false

        }
        console.log("hei")
        const response=await dispatch(fetchData(apiData))
        const {message,token,email}=response?.payload?.data
        if(message==='Admin login succesful'){
         
              
            useme(message,'success')
            dispatch(adminLogin(response.payload.data))  
            return navigate('/admin')
        }else return useme(message,'error')

        


    }
    

    return (

        
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="bg-admin-secondory h-5/6 w-3/5 px-10 gap-2 rounded-2xl shadow-2xl flex flex-row text-center text-zinc-50 font-Outfit font-bold text-4xl py-16"
        >
            
            <div className=' w-1/2 border-r-2 border-gray-600'>


                <motion.img
                    initial={{ y: '-1vh' }}
                    animate={{ y: '1vh' }}
                    exit={{ y: '1vh' }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                    src="/admin/4707071.jpg"
                    alt=""
                />
            </div>
            
            <div className='w-1/2 flex  items-center'>

                <div className=' h-1/2 w-full flex items-start justify-center '>
                    

                    <div className=" h-1/2 w-3/4 mt-10" >
                    <form onSubmit={handlSubmit}>
                        <div className="flex  flex-col">
                     
                    

                           {cred?.email?.length!==0?(<label htmlFor=""  className="text-sm flex flex-start text-gray-600 font-thin" >email</label> ):''} 

                            <motion.input type="email" required onChange={e=>setCred({...cred,email:e.target.value})} className="mb-2 rounded-lg text-sm p-2.5 m-0 placeholder-slate-500 text-black bg-admin-primary outline-none border " placeholder="email" initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} />


                          {cred?.password?.length!==0?(<label htmlFor="" className="text-sm flex flex-start text-gray-600 font-thin" >password</label>):''}  
                            <motion.input type="password" onChange={e=>setCred({...cred,password:e.target.value})} required className="mb-2 rounded-lg text-sm p-2.5 m-0 placeholder-slate-500 text-black bg-admin-primary outline-none border " placeholder="password" initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} />
                            <motion.button
                                type="submit"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ boxShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 20px #ffffff" }}
                                className="shine-button bg-admin-button  text-gray-300 font-Outfit-button font-semibold px-7 py-1 text-sm rounded-lg border mb-2 border-gray-500"
                            >
                                Login
                            </motion.button>

                            {/* </form> */}

                            <div className="flex justify-end text-sm mt-1 mr-1 text-gray-400 font-thin">

                                {/* <Link to={'/userRegister'}>You don't Have an Account?</Link>*/}
                                <ToastContainer /> 

                            </div>
                        </div>
                        </form>

                    </div>
                    
                </div>


            </div>
           

        </motion.div>
        
    )




}

export default Canvas