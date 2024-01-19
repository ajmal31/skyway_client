import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { USER_SRV_BASE_URL } from "../../../data/const";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../redux/api/api";
import { useme } from "../../../hooks/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, SetRegister] = useState({
        username: '',
        email: '',
        phone: '',
        region: '',
        destination: '',
        profile: '',
        password: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        let testNumber = register?.phone + '';
        const numberLen = testNumber?.length;
        const regionLen = register.region.length;
        const destLen = register.destination.length;
        const error = 'error';
        const success = 'success';
        if (register?.email?.length > 30) useme('Email limit exceeded', error);
        else if (numberLen !== 10) useme('Please enter a valid number', error);
        else if (register?.password?.length < 4) useme('Password must be at least 4 characters long', error);
        else if (regionLen < 2) useme('Please enter a valid region', error);
        else if (destLen < 2) useme('Please enter a valid destination', error);
        else {

            // const formData = new FormData();
            // formData.append('username', register.username);
            // formData.append('email', register.email);
            // formData.append('phone', register.phone);
            // formData.append('region', register.region);
            // formData.append('destination', register.destination);
            // formData.append('password', register.password);
            // formData.append('profile', register.profile);
            const obj = {
                method: 'post',
                url: USER_SRV_BASE_URL + 'register',
                data: register,
                token: false,

            };
            // const obj = {
            //     method: 'post',
            //     url: USER_SRV_BASE_URL + 'register',
            //     data: formData,
            //     token: false,

            // };


            const res = await dispatch(fetchData(obj));


            const { message } = res.payload.data;
            if (message === 'email already used' || 'phone number already used') useme(message, error);
            const { response } = res.payload.data;

            if (response) {
                useme('User registered successfully', success);
                navigate('/userlogin');
            }
        }
    };
    console.log("details", register)

    return (
        <div className="grid grid-cols-2 h-4/5 mt-5 bg-secondary ">
            <div className=" h-2/2 w-4/8 text-black border-r-4 border-gray-200 grid place-items-start">
                <div className="bg-secondary w-11/12 h-full">
                    <motion.img
                        initial={{ y: '-1vh' }}
                        animate={{ y: '1vh' }}
                        exit={{ y: '1vh' }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                        src="/login-cover-image.png"
                        alt=""
                    />
                </div>
            </div>

            <div className="h-2/2 w-4/8 text-black flex justify-end">

                <div className="w-3/4 m-2 flex flex-col ">

                    <form action="" onSubmit={handleRegister} className="flex flex-col justify-center">

                        <motion.input
                            type="text" required
                            value={register.username}
                            onChange={(e) => SetRegister({ ...register, username: e.target.value })}
                            className="mb-2 rounded-lg text-sm p-2 bg-gray-200 outline-none border"
                            placeholder="Username"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                        />
                        <motion.input
                            type="email"
                            required
                            value={register.email}
                            onChange={(e) => SetRegister({ ...register, email: e.target.value })}
                            className="mb-2 rounded-lg text-sm p-2 bg-gray-200 outline-none border"
                            placeholder="Email"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                        />
                        <motion.input
                            type="number"
                            required
                            value={register.phone}
                            onChange={(e) => SetRegister({ ...register, phone: e.target.value })}
                            className="mb-2 rounded-lg text-sm p-2 bg-gray-200 outline-none border"
                            placeholder="Phone Number"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                        />
                        <motion.input
                            type="text"
                            required
                            value={register.region}
                            onChange={(e) => SetRegister({ ...register, region: e.target.value })}
                            className="mb-2 rounded-lg text-sm p-2 bg-gray-200 outline-none border"
                            placeholder="Region"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                        />
                        <motion.input
                            type="text"
                            required
                            value={register.destination}
                            onChange={(e) => SetRegister({ ...register, destination: e.target.value })}
                            className="mb-2 rounded-lg text-sm p-2 bg-gray-200 outline-none border"
                            placeholder="Destination Country"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                        />
                        {/* <motion.input
                            type="file"
                            value={register.profile}
                            onChange={(e) => SetRegister({ ...register, profile: e.target.value })}
                            className="mb-2 rounded-lg text-sm p-2 bg-gray-200 outline-none border"
                            placeholder="profile"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            style={{ width: '97%' }}
                        /> */}
                        <motion.input
                            type="password"
                            required
                            value={register.password}
                            onChange={(e) => SetRegister({ ...register, password: e.target.value })}
                            className="mb-2 rounded-lg text-sm bg-gray-200 p-2 outline-none border"
                            placeholder="Password"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                        />

                        <motion.button
                            type="submit"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ boxShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 20px #ffffff" }}
                            className="shine-button bg-sec-button text-white font-Outfit-button font-semibold px-7 py-1 text-sm rounded-lg border mt- border-gray-500"
                        >
                            Register
                        </motion.button>
                        <div className="flex justify-end text-sm mt-1 mr-1 text-gray-400 font-thin">
                            <Link to="/userLogin"> already have an account?</Link>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default RegisterContent;
