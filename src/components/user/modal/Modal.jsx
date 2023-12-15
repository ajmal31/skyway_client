import { useState } from "react"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "../../../firebase/firebase"
import { useme } from "../../../hooks/toast"
import { warning } from "framer-motion"

const Modal = ({ visible, onClose, phoneNumber,verifySuccess }) => {

    if (!visible) return null

    const [verified, setVerifed] = useState(false)
    const handleVisible = () => onClose()
    // const [otp, setOtp] = useState('')

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
    const handleSuccess=()=>verifySuccess()

    const handleSendOtp = async () => {

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

    }


    //verfyt otp
    const verifyOtp = async () => {
        let final = otp.join('')
        console.log('final otp', final)
        console.log('confirmation state', user)
        try {

            let response = await user.confirm(final)
            console.log('response of the otp', response)
            if (response) {
                useme("you phone number verification success", "success")
                setOtp(['', '', '', '', '', ''])
                handleSuccess()
                handleVisible()



            }
            // handleVisible()

        } catch (error) {
            console.log('erro encounterd while verify otp', error)
            useme(error, "warning")
            setOtp(['', '', '', '', '', ''])
            handleVisible()

        }
    }
    return (
        <div className=" h-full w-full z-50 flex justify-center items-center flex-col fixed font-Outfit text-gray-300 backdrop-brightness-50 top-0 backdrop-blur-sm  " onClick={handleVisible} >

            <div className="bg-secondory w-2/6 h-1/3 rounded-xl flex justify-center items-center " onClick={e => e.stopPropagation()}  >
                {!verified ?
                    <div className="flex justify-center flex-col" >
                        <p className="text-xl">{phoneNumber} Are you sure ?</p>
                        <button className="border p-1 py-2 hover:bg-button rounded-xl " onClick={handleSendOtp} >send otp</button>

                    </div> :


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


                    </div>

                }


            </div>
            <div id={captchaId} className="" ></div>
        </div>
    )



}

export default Modal