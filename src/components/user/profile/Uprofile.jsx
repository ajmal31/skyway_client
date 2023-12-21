import { useDispatch } from "react-redux"
import Navbar from "../Home/Navbar"
import { userLogout } from "../../../redux/slices/UserSlice"
import { useEffect, useState } from "react"
import { USER_SRV_BASE_URL } from "../../../data/const"
import { fetchData } from "../../../redux/api/api"
import { useme } from "../../../hooks/toast"
import { changeUsername } from "../../../redux/slices/UserSlice"
import Modal from "../modal/Modal"
import { motion } from "framer-motion"
import { IoCloudUploadSharp } from "react-icons/io5";
const Uprofile = () => {

    const [userCred, setUserCred] = useState({})
    const [edit, setEdit] = useState(false)
    const [showUploadButton, setShowUploadButton] = useState(false)
    const [documents, setDocuments] = useState({
        govId: null,
        aadhar: null,
        pan: null,
        passport: null
    })

    //div animation configuration
    const commonMotion = {

        initial: { translateY: -30, translateX: +20 },
        animate: { translateY: 0, translateX: 0 },
        transition: { duration: 0.8, ease: 'easeInOut' }

    }
    const documentLabels = [
        {
            label: "upload your Government id",
            value: documents.governmentId,
            name: 'govId'

        },
        {
            label: "upload your Adharcard",
            value: documents.adhar,
            name: 'aadhar'

        },
        {
            label: "upload your pan card",
            value: documents.pancard,
            name: "pan"

        },
        {
            label: "upload your Passport",
            value: documents.passport,
            name: 'passport'

        }

    ]

    useEffect(() => {

        const { govId, aadhar, pan, passport } = documents
        if (govId && aadhar && pan && passport !== null) setShowUploadButton(true)

    }, [documents])

    //selected input storing to partiular state key
    const handleUploadChange = (e) => {

        let file = e.target.files[0];
        let name = e.target.name;

        setDocuments((prevDocuments) => ({
            ...prevDocuments,
            [name]: file,
        }));


    };


    const handleUpload = async () => {

        const formdata = new FormData
        for (const key in documents) {
            if (documents[key] instanceof File) {
                await formdata.append("file", documents[key]);
            }
        }
        const apiDetails = {
            method: 'post',
            url: USER_SRV_BASE_URL + 'upload',
            data: formdata,
            token: false,
            to: 'user'
        }
        let response = await dispatch(fetchData(apiDetails))
        console.log('response of the document upload',response)
    }


    const handUpdateUser = (e) => {
        let val = e.target.value
        let name = e.target.name

        setUserCred({ ...userCred, [name]: val })

    }
    const updateButton = async () => {

        let testNumber = userCred?.phone + "";
        const numberLen = testNumber?.length;
        const regionLen = userCred?.region?.length;
        const destLen = userCred?.destination?.length;
        const error = 'error';
        if (userCred?.username.length <= 0) useme("please enter a valid name", error)
        else if (!/^.+@.+\.[a-zA-Z]{2,3}$/.test(userCred.email)) useme("enter a valid email", error)
        else if (userCred?.email?.length > 30) useme('Email limit exceeded', error);
        else if (numberLen !== 10) useme('Please enter a valid number', error);
        else if (regionLen < 2) useme('Please enter a valid region', error);
        else if (destLen < 2) useme('Please enter a valid destination', error);
        else {

            setEdit(false)

            const obj = {
                method: 'post',
                url: USER_SRV_BASE_URL + 'updateUser',
                data: userCred,
                token: true,
                to: 'user'
            }
            const response = await dispatch(fetchData(obj))
            const message = response?.payload?.data?.response?.message
            if (message) {

                useme(message, 'warning')

            }
            else if (response?.payload?.data?.response) {

                dispatch(changeUsername(response?.payload?.data?.response?.username))
                useme("Profile Updated", 'info')

            }




        }


    }

    //user Logout
    const dispatch = useDispatch()
    const Logout = () => {
        dispatch(userLogout())
    }

    const getUserDetails = async () => {


        const obj = {
            method: 'get',
            url: USER_SRV_BASE_URL + "getUser",
            data: null,
            token: true,
            to: 'user'
        }
        const response = await dispatch(fetchData(obj))
        setUserCred(response?.payload?.data?.response)

    }
    useEffect(() => {

        getUserDetails()

    }, [])

    //modal
    const [visible, setVisible] = useState(false)
    const handlVisible = () => setVisible(false)
    const verifySuccess = async () => {
        console.log('verify succes function')

        const apiDetails = {
            method: 'get',
            url: USER_SRV_BASE_URL + "numberVerified",
            data: null,
            token: true,
            to: "user"
        }
        const response = await dispatch(fetchData(apiDetails))
        setUserCred(response?.payload?.data)
    }

    return (

        <div className="bg-primary w-screen  h-screen">

            <Navbar />

            <Modal visible={visible} onClose={handlVisible} phoneNumber={userCred?.phone} verifySuccess={verifySuccess} />


            <div className=" w-full flex px-16 pt-10 flex-col text-gray-200 font-Outfit ">


                <div className=" flex   " >

                    <motion.div {...commonMotion} className="w-1/2 m-2 bg-secondory flex rounded-2xl">


                        <div className="  w-1/3 border-gray-500 border-r mr-3 flex justify-center  ">profile photo</div>
                        <div className="flex-grow  rounded-2xl ">
                            {/* user details content */}

                            <label htmlFor="" className="text-gray-500 text-sm  ">Username</label><br />
                            {edit ? <input type="text" onChange={handUpdateUser} name="username" value={userCred?.username} className="bg-transparent outline-none" /> : <input type="text" onChange={handUpdateUser} readOnly value={userCred?.username} className="bg-transparent outline-none" />}
                            <hr className="border-b border-gray-500 w-2/3 " />
                            <label htmlFor="" className="text-gray-500 text-sm">Email</label><br />
                            {edit ? <input type="email" onChange={handUpdateUser} name="email" value={userCred?.email} className="bg-transparent outline-none" /> : <input type="email" onChange={handUpdateUser} readOnly value={userCred?.email} className="bg-transparent outline-none" />}
                            <hr className="border-b border-gray-500 w-2/3" />
                            <label htmlFor="" className="text-gray-500 text-sm">Region</label><br />
                            {edit ? <input type="text" onChange={handUpdateUser} name="region" value={userCred?.region} className="bg-transparent outline-none" /> : <input type="text" onChange={handUpdateUser} readOnly value={userCred?.region} className="bg-transparent outline-none" />}
                            <hr className="border-b border-gray-500 w-2/3" />
                            <label htmlFor="" className="text-gray-500 text-sm">Destination</label><br />
                            {edit ? <input type="text" onChange={handUpdateUser} name="destination" value={userCred?.destination} className="bg-transparent outline-none" /> : <input type="text" onChange={handUpdateUser} readOnly value={userCred?.destination} className="bg-transparent outline-none" />}
                            <hr className="border-b border-gray-500 w-2/3" />
                            <label htmlFor="" className="text-gray-500 text-sm">Phone</label><br />
                            {edit ? <input type="number" onChange={handUpdateUser} name="phone" value={userCred?.phone} className="bg-transparent outline-none" /> : <input type="number" onChange={handUpdateUser} readOnly value={userCred?.phone} className="bg-transparent outline-none" />}

                            <hr className="border-b border-gray-500 w-2/3" />
                            <br />
                            <div>
                                <button onClick={Logout} className="text-gray-300 border p-1 rounded-xl px-3 hover:bg-button " >Logout</button>

                                <div className="text-end pb-3 mr-5">
                                    {!edit && !userCred?.phone_verification ? <button className="border border-gray-500 px-1 rounded-xl" onClick={e => setVisible(true)} >Verify Number ?</button> : ''}
                                    {!edit ?

                                        <button onClick={e => setEdit(true)} className="ml-4" >Edit</button>
                                        : <button onClick={updateButton} className="ml-4" >update</button>}

                                </div>
                            </div>



                        </div>

                    </motion.div>
                    <motion.div {...commonMotion} className="w-1/2 m-2 shadow-2xl  shadow-stone-950 bg-secondory rounded-2xl p-7 ">

                        <div className="h-full w-full  flex flex-col  " >
                            {documentLabels?.map((val, index) => (
                                <span>
                                    <label htmlFor="">{val.label}</label>

                                    <div onClick={() => document.getElementById(val.name).click()}  >
                                        {console.log("val", val.value)}
                                        <IoCloudUploadSharp className="w-10 h-10 cursor-pointer  " />
                                        <input type="file" name={val.name} id={val.name} onChange={handleUploadChange} style={{ display: 'none' }} />
                                    </div>
                                    <hr className="border-b border-gray-500 w-2/3" />

                                </span>



                            ))}
                            {showUploadButton ?
                                <div className="flex justify-end" >
                                    <button className="border p-1 px-3 rounded-2xl" onClick={handleUpload} >upload</button>
                                </div> : ''

                            }

                        </div>




                    </motion.div>
                </div>
            </div>


        </div>

    )
}

export default Uprofile