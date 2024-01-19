import { useEffect, useState } from "react"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "../../../firebase/firebase"
import { useme } from "../../../hooks/toast"
import { USER_SRV_BASE_URL } from "../../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"

const Modal = ({ visible, onClose, phoneNumber, verifySuccess }) => {

    if (!visible) return null
    const dispatch = useDispatch()
    const [verified, setVerifed] = useState(false)
    const handleVisible = () => onClose()
    const [showInputs, setShowInputs] = useState(true)
    const [timer, setTimer] = useState(0)
    // const [otp, setOtp] = useState('')

    const remainingTime = async () => {

        const apiDetails = {
            method: 'get',
            url: USER_SRV_BASE_URL + "getUser",
            data: null,
            token: true,
            to: "user"

        }
        const response = await dispatch(fetchData(apiDetails))
        console.log("last otp", response)
        const { last_otp } = response?.payload?.data?.response
        if (last_otp) {
            let currentTime = new Date()
            let diff = currentTime - new Date(last_otp)
            let remainingMilliSeconds = Math.max(0, diff)
            let remainingSeconds = Math.ceil(remainingMilliSeconds / 1000)
            let remainingMinutes = Math.ceil(remainingSeconds / 60)
            const remainingSecondsString = String(remainingSeconds % 60).padStart(2, "0");
            const existingTimeLimit = {
                minutes: 3 - remainingMinutes,
                seconds: 59 - Number(remainingSecondsString), // Start countdown from 59 seconds
            };

            setTimer(existingTimeLimit)
            setShowInputs(existingTimeLimit.minutes <= 0)

        }

    }

    useEffect(() => {

        remainingTime()
    }, [])

    useEffect(() => {
        let intervalId;
        const { seconds, minutes } = timer
        if (minutes > 0 || seconds > 0) {
            intervalId = setInterval(() => {
                if (seconds > 0) {
                    setTimer({ minutes, seconds: seconds - 1 })
                } else {
                    setTimer({ minutes: minutes - 1, seconds: 59 })

                }

                if (minutes === 0 && seconds === 0) {
                    clearInterval(intervalId);
                    setShowInputs(true);
                }
            }, 1000);

            return () => clearInterval(intervalId);//for when component unMounting
        } else if (minutes === 0 && seconds === 0) {
            setShowInputs(true)
            return () => clearInterval(intervalId)
        }


    }, [timer]);


    //otp state hanlder
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (e, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = e.target.value;
        setOtp(updatedOtp);
    };
    const captchaId = "recaptcha"
    const [user, setUser] = useState('')

    //handle if otp is success
    const handleSuccess = () => verifySuccess()

    const handleSendOtp = async () => {
        if (timer.minutes <= 0 || timer.seconds <= 0|| timer ===0) {
            console.log("enter")
            setVerifed(true)
            try {
                const recaptcha = new RecaptchaVerifier(auth, captchaId, {})
                let k = await recaptcha.verify()

                const confirmation = await signInWithPhoneNumber(auth, `+91 ${phoneNumber}`, recaptcha)
                setUser(confirmation)

            } catch (err) {
                console.log('error founded while configuring otp', err)
                useme(err, "warning")
            }

        } else setVerifed(true)


    }


    //verfyt otp
    const verifyOtp = async () => {
        let final = otp.join('')
        try {
            //if confirm is not here invoke captcha make anothter otp request
            if (!user?.confirm) return handleSendOtp()
            let response = await user?.confirm(final)

            if (response) {
                useme("you phone number verification success", "success")
                setOtp(['', '', '', '', '', ''])
                handleSuccess()
                handleVisible()



            }
            // handleVisible()

        } catch (error) {
            console.log('erro encounterd while verify otp', error)
            useme(`Invalid otp Please try again after`, "error")

            setOtp(['', '', '', '', '', ''])
            const apiDetails = {
                method: 'get',
                url: USER_SRV_BASE_URL + "otpFailed",
                data: null,
                token: true,
                to: 'user'
            }
            const response = await dispatch(fetchData(apiDetails))
            return handleVisible()





        }
    }
    return (
        <div className=" h-full w-full z-50 flex justify-center items-center flex-col fixed font-Outfit text-gray-300 backdrop-brightness-50 top-0 backdrop-blur-sm  " onClick={handleVisible} >

            <div className="bg-secondory w-2/6 h-1/3 rounded-xl flex justify-center items-center " onClick={e => e.stopPropagation()}  >
                {!verified ?
                    <div className="flex justify-center flex-col" >
                        <p className="text-xl">{phoneNumber} Are you sure ?</p>
                        <button className="border p-1 py-2 hover:bg-button rounded-xl " onClick={handleSendOtp} >send otp</button>

                    </div> : showInputs ?


                        <div className="flex justify-center items-center flex-col" >

                            <div className="flex space-x-5">
                                {otp.map((digit, index) => (
                                    <input

                                        key={index}
                                        type="text"
                                        min="1"
                                        max="10"
                                        maxLength="1"

                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-10 h-10 p-2 border-none outline-none text-black bg-gray-300 rounded text-center "


                                    />
                                ))}
                            </div>

                            <button className="border p-1 px-2 border-gray-300 hover:bg-button rounded-xl mt-5 " onClick={verifyOtp} >confirm</button>

                            {console.log("timer", timer)}
                        </div> : <h1 className="font-Outfit  ">Please wait  : {timer.minutes}:{timer.seconds}</h1>

                }


            </div>
            <div id={captchaId} className="" ></div>
        </div>
    )



}

export default Modal