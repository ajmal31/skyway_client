import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useState } from "react"
import { useme } from "../../../hooks/toast"
import { fetchData } from "../../../redux/api/api"
import { USER_SRV_BASE_URL } from "../../../data/const"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userLogin } from "../../../redux/slices/UserSlice"
import { GoogleLogin } from "@react-oauth/google"
import cookie from "js-cookie"



const LoginContent = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userCred, setUserCred] = useState({

        email: '',
        password: ''
    })

    const error = 'error'
    const success = 'success'

    const handleLogin = async (e) => {
        e.preventDefault()
        //two time alert occuring !! why?
        if (userCred.email.length > 30) useme('Please enter valid email', error)
        else if (userCred.password.length < 4) useme('please enter valid password', error)

        else {

            let obj = {
                method: 'post',
                url: USER_SRV_BASE_URL + 'login',
                data: userCred,
                token: false,
                
            }
            const res = await dispatch(fetchData(obj))
            console.log('after login',res)
            const { message } = res.payload.data
            if (message === "user Logged in succesful") {
                
                const { authToken,username,userId} = res.payload.data
                useme(message, success)
                cookie.set("userId",userId)
                dispatch(userLogin(res.payload.data))
                navigate('/')



            }
            else if (message === "please enter your valid password" || "user does not exist") useme(message, error)


        }

    }

    const handlegoogleLogin = async (credentials) => {
        //exact value making like an object and assign to an variable

        const data = { encodedData: credentials.credential }
       
        const obj = {
            method: 'post',
            url: USER_SRV_BASE_URL + 'googleLogin',
            data: data,
            token: false

        }
        const response = await dispatch(fetchData(obj))
        

        const { authToken, message,username,userId } = response.payload.data

        if (!authToken) useme(message,'error')
        else {
            cookie.set("userId",userId)
            useme(message, 'success')
            dispatch(userLogin(response.payload.data))
            navigate('/')
        }


    }

    return (

        <div className="grid grid-cols-2 h-4/5 mt-5  bg-secondory">
            <div className=" bg-secondory h-2/2 w-4/8 text-black border-r-4 sm:hidden lg:block border-gray-200 grid place-items-start  "  >

                <div className=" bg-secondor w-11/12 h-full  ">

                    {/* <img src="https://o.remove.bg/downloads/72cecf4f-9d98-451f-bb13-0ed62b19f0bb/man-hat-hat-stands-front-globe-with-words-europe-it_741910-5363-removebg-preview.png" alt="" /> */}
                    <motion.img

                        initial={{ y: '-1vh' }}
                        animate={{ y: '1vh' }}
                        exit={{ y: '1vh' }}
                        transition={{
                            duration: 0.8, // Adjust the duration as needed
                            repeat: Infinity, // Infinite animation loop
                            repeatType: 'reverse', // Reverse animation direction on each repeat

                        }}

                        src="/login-cover-image.png" alt="cover image" />
                </div>

            </div>



            <form onSubmit={handleLogin}>
                <div className=" bg-secondory flex   justify-center">


                    <div className=" h-1/2 lg:w-3/4 sm:w-full   mt-20" >
                        <div className="flex justify-start flex-col">
                            {/* <p className="text-sm flex justify-start pl-2  text-gray-300">email</p> */}


                            {userCred.email.length > 0 ? <label htmlFor="" className="text-sm flex flex-start text-gray-300 font-thin" >email</label> : null}

                            <motion.input type="email" required onChange={e => setUserCred({ ...userCred, email: e.target.value })} className="mb-2 rounded-lg text-sm p-2.5 m-0 text-black bg-gray-300 outline-none border " placeholder="email" initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} />

                            {/* <p className="text-sm flex justify-start pl-2 text-gray-300" >password</p> */}
                            {userCred.password.length > 0 ? <label htmlFor="" className="text-sm flex flex-start text-gray-300 font-thin" >password</label> : null}
                            <motion.input type="password" required onChange={e => setUserCred({ ...userCred, password: e.target.value })} className="mb-2 rounded-lg text-sm p-2.5 m-0  text-black bg-gray-300 outline-none border " placeholder="password" initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} />
                            <motion.button
                                type="submit"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ boxShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 20px #ffffff" }}
                                className="shine-button bg-sec-button text-gray-300 font-Outfit-button font-semibold px-7 py-1 text-sm rounded-lg border mb-2 border-gray-500"
                            >
                                Next
                            </motion.button>

                            <GoogleLogin
                                onSuccess={handlegoogleLogin}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />

                            {/* <motion.button
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ boxShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 20px #ffffff" }}
                            className="shine-button bg-none text-gray-300 text-sm px-7 py-1  rounded-lg border font-serif border-gray-500"
                        >
                            Login with Google
                        </motion.button> */}


                            <div className="flex justify-end text-sm mt-1 mr-1 text-gray-400 font-thin">

                                <Link to={'/userRegister'}>You don't Have an Account?</Link>

                            </div>
                        </div>

                    </div>

                </div>
            </form>

        </div>
    )

}

export default LoginContent