import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VENTURE_SRV_BASE_URL } from '../../../data/const'
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api";
import { useNavigate } from "react-router-dom";
import { ventureLogin } from "../../../redux/slices/ventureSlices";
import { useme } from "../../../hooks/toast";
import cookie from "js-cookie"
const VloginContent = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cred, setCred] = useState({

        email: '',
        password_one: '',
        password_two: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()


        const obj = {
            method: 'post',
            url: VENTURE_SRV_BASE_URL + 'login',
            data: cred,
            token: false

        }

        const response = await dispatch(fetchData(obj))

        const { message, token, admin_allowed, ventureName, ventureId } = response?.payload?.data

        const data = {
            ventureToken: token,
            ventureName,
            admin_allowed,
        
        }

        if (message === 'venture login succesful' && admin_allowed === "allowed") {
            //venture Id storing to coooki
            cookie.set('ventureId',ventureId,{expires: 7})

            dispatch(ventureLogin(data))
            return navigate('/venture/dashboard')

        } else if (admin_allowed === "pending") {

            dispatch(ventureLogin(data))
            return navigate('/venture/pending')

        }else if(admin_allowed==="rejected"){
            dispatch(ventureLogin(data))
            useme("sorry you can't enter the platform. founded Illegal activities","error")
            return <h1>Founded illegal activities so you can't enter the platform </h1>
        }
        else return useme(message, 'error')




    }


    return (

        <div className="grid grid-cols-2 h-4/5 mt-5   bg-secondory">
            <div className=" bg-secondory h-2/2 w-4/8 text-black border-r-4 border-gray-200 grid place-items-start  "  >

                <div className=" bg-secondor w-11/12 h-full   ">

                    {/* <img src="https://o.remove.bg/downloads/72cecf4f-9d98-451f-bb13-0ed62b19f0bb/man-hat-hat-stands-front-globe-with-words-europe-it_741910-5363-removebg-preview.png" alt="" /> */}
                    <motion.img

                        initial={{ y: '-1vh' }}
                        animate={{ y: '1vh' }}
                        exit={{ y: '1vh' }}
                        transition={{
                            duration: 2, // Adjust the duration as needed
                            repeat: Infinity, // Infinite animation loop
                            repeatType: 'reverse', // Reverse animation direction on each repeat

                        }}

                        src="/login-cover-image.png" alt="cover image" />
                </div>

            </div>



            <form onSubmit={handleSubmit}>
                <div className=" bg-secondory flex justify-center">


                    <div className=" h-1/2 w-3/4 mt-20" >
                        <div className="flex justify-start flex-col">
                            {/* <p className="text-sm flex justify-start pl-2  text-gray-300">email</p> */}


                            {cred.email.length > 0 ? <label htmlFor="" className="text-sm flex flex-start text-gray-300 font-thin" >email</label> : null}

                            <motion.input type="email" required onChange={e => setCred({ ...cred, email: e.target.value })} className="mb-2 rounded-lg text-sm p-2.5 m-0 text-black bg-gray-300 outline-none border " placeholder="email" initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} />

                            {/* <p className="text-sm flex justify-start pl-2 text-gray-300" >password</p> */}
                            {cred.password_one.length > 0 ? <label htmlFor="" className="text-sm flex flex-start text-gray-300 font-thin" >first Password</label> : null}
                            <motion.input type="password_one" required onChange={e => setCred({ ...cred, password_one: e.target.value })} className="mb-2 rounded-lg text-sm p-2.5 m-0  text-black bg-gray-300 outline-none border " placeholder="first password" initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} />
                            {cred.password_two.length > 0 ? <label htmlFor="" className="text-sm flex flex-start text-gray-300 font-thin" >second Password</label> : null}
                            <motion.input type="password_two" required onChange={e => setCred({ ...cred, password_two: e.target.value })} className="mb-2 rounded-lg text-sm p-2.5 m-0  text-black bg-gray-300 outline-none border " placeholder="second password" initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} />
                            <motion.button
                                type="submit"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ boxShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 20px #ffffff" }}
                                className="shine-button bg-sec-button text-gray-300 font-Outfit-button font-semibold px-7 py-1 text-sm rounded-lg border mb-2 border-gray-500"
                            >
                                Next
                            </motion.button>






                            <div className="flex justify-end text-sm mt-1 mr-1 text-gray-400 font-thin">

                                <Link to={'/venture/register'}>You don't Have an Account?</Link>
                                <ToastContainer />

                            </div>
                        </div>

                    </div>

                </div>
            </form>

        </div>
    )
}

export default VloginContent