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
import { IoMdCloseCircle } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ConnectedVentureTable from "./ConnectedVenturesTable"

const Uprofile = () => {

    const [userCred, setUserCred] = useState(null)
    const [edit, setEdit] = useState(false)
    const [showUploadButton, setShowUploadButton] = useState(false)
    const [uploadedDocuments, setUploadedDocuments] = useState({});
    const [documentsFromDb, setDocumentsFromDb] = useState([])
    const [buttonLoading, setButtonLoading] = useState(false)
    const [connectedVentures, setConnectedVentures] = useState(null)
    const [manipulatedData, setManipulatedData] = useState(null)
    const [documents, setDocuments] = useState({
        govId: null,
        aadhar: null,
        pan: null,
        passport: null
    })

    //Div Animation Configuration
    const commonMotion = {

        initial: { translateY: -30, translateX: +20 },
        animate: { translateY: 0, translateX: 0 },
        transition: { duration: 0.8, ease: 'easeInOut' }

    }
    //Document labels
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
        else setShowUploadButton(false)

    }, [documents])

    //selected input storing to partiular state key
    const handleUploadChange = (e) => {


        let file = e.target.files[0];
        let name = e.target.name;

        const type = file?.name?.split('.')
        if (type[type.length - 1] !== "pdf") return useme("invalid format kindly choose pdf format", 'warning')

        setDocuments((prevDocuments) => ({
            ...prevDocuments,
            [name]: file,
        }));

        setUploadedDocuments((prevDocuments) => ({
            ...prevDocuments,
            [name]: file.name
        }))


    };

    //Document Upload Handler
    const handleUpload = async () => {

        setButtonLoading(true)
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
            token: true,
            to: 'user'
        }
        let response = await dispatch(fetchData(apiDetails))
        if (response) {
            setDocumentsFromDb(response?.payload?.data?.documents)
            setButtonLoading(false)
            setShowUploadButton(false)

        }

    }

    //User Cred State Handler During the Updation
    const handUpdateUser = (e) => {
        let val = e.target.value
        let name = e.target.name

        setUserCred({ ...userCred, [name]: val })

    }
    //User Cred Update Handler
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
    //Get User Details 
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
        setDocumentsFromDb(response?.payload?.data?.response?.documents)
       

    }
    //Taking All Connected Ventures
    const getConnectedVentures = async () => {

        const apiDetails = {
            method: 'get',
            url: USER_SRV_BASE_URL + '/get/all/connected/Ventures',
            data: null,
            token: true,
            to: 'user'
        }
        const response = await dispatch(fetchData(apiDetails))
        console.log('helo response', response)
        setConnectedVentures(response?.payload?.data?.response)


    }

    useEffect(() => {

        getUserDetails()
        getConnectedVentures()

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

    //removing uploaded file 
    const removeUpload = (name) => {

        setUploadedDocuments((prev) => {
            const { [name]: _, ...rest } = prev;
            return rest
        });
        setDocuments((prev) => ({
            ...prev, [name]: null
        }))
        const input = document.getElementById(name);
        input.value = ''; // Resetting the value to empty string
        input.value = null; // Resetting the value to null
    }

    var result = []
    if (userCred && connectedVentures) {
        console.log('user', userCred)
        console.log('venture', connectedVentures)

        for (const key of userCred.ventures) {

            let m = connectedVentures.find(item => item.data._id === key.ventureId)
            console.log('mmm', m?.data.ventureName)
            if (m?.data) {

                result.push({ ventureName: m?.data.ventureName, ventureId: key?.ventureId, user_status: key?.status, service_started_by: key?.service_start_by, service_complete_by: key?.service_complete_by })
            }


        }


    }

    //Upload User Image Handler
    const uploadUserImage=async(e)=>{

        e.preventDefault()
        let file=e.target.files[0]

        let form=new FormData()

        form.append("profile-image",file)
        
        const apiDetails={
            method:"post",
            url:USER_SRV_BASE_URL+"/upload/user/profile/image",
            data:form,
            token:true,
            to:"user"
        }
        const response=await dispatch(fetchData(apiDetails))
        getUserDetails()
        
    }
 console.log("user cred",userCred)
    return (

        <div className="bg-primary w-[100%] overflow-hidden  ">

            <Navbar />

            <Modal visible={visible} onClose={handlVisible} phoneNumber={userCred?.phone} verifySuccess={verifySuccess} />


            <div className=" w-full flex flex-col px-16 pt-10 justify-center items-center   text-gray-200 font-Outfit ">



                <div className=" w-[100%] flex lg:flex-row xl:flex-row md:flex-col sm:flex-col min-[100px]:flex-col justify-evenly  mb-14  overflow-hidden mt-14 " >

                    <motion.div {...commonMotion} className=" xl:w-[550px] lg:w-[450px] md:w-full sm:w-[500px] min-[100px]:w-[500px] bg-secondory shadow-2xl mt-3 shadow-stone-950 flex  rounded-2xl">


                        <div className=" xl:block md:block sm:block hidden w-1/3 border-gray-500 border-r mr-3 text-center p-4   ">
                            <p>Profile photo</p>
                            <div className="   lg:w-[100px] lg:h-[100px] xl:w-[150px] xl:h-[150px] 2xl:w-[150px] 2xl:h-[150px]  md:h-[120px] md:w-[120px]  rounded-full mt-2 overflow-hidden  " >

                                <img src={ userCred?.profile_image?? "/user-avatar.jpg"} alt="user profile image"  className="object-fill h-full w-full " contentEditable />


                            </div>
                            <div>
                              
                                <input type="file" name="profile-image" onChange={uploadUserImage} className="w-1/2" />
                                <button type="submit">upload</button>
                               
                            </div>
                            <div className=" flex justify-end pr-3 top-0 left-0  " >
                                <FontAwesomeIcon icon={faEdit} className="text-white cursor-pointer  text-end" />
                            </div>


                        </div>
                        <div className="flex-grow md:pl-4 sm:pl-4 min-[500px]:pl-4 rounded-2xl ">
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
                    <motion.div {...commonMotion} className="xl:w-[550px] lg:w-[450px] md:w-[690px] l ml-2  shadow-2xl sm:w-[500px] shadow-stone-950 mt-3 bg-secondory rounded-2xl  ">

                        <div className="h-full w-full  flex flex-col mt-2 ml-5 " >

                            {documentsFromDb?.length > 0 ? (
                                documentsFromDb.map((value, index) => (

                                    <span key={index}>


                                        {Object.keys(value).map((key,index) => (
                                            // console.log('inside vallues key',value[key])

                                            <div  >

                                                <div className="flex gap-5 my-3 text-gray-400  "  >

                                                    <a href={value[key]} target="_blank" className="border px-3 rounded-xl" rel="noopener noreferrer">View {key}</a>

                                                </div>
                                            
                                            {index!==4-1?<hr className="border-b border-gray-500 w-2/3" />:''}
                                            </div>

                                        ))}

                                        {/* <hr className="border-b border-gray-500 w-2/3" /> */}

                                    </span>

                                ))



                            ) : (

                                documentLabels?.map((val, index) => (
                                    <span key={index} className="">
                                        <label htmlFor="">{val.label}</label>

                                        <div onClick={() => document.getElementById(val.name).click()} >
                                            {uploadedDocuments[val?.name] ? (
                                                <div className="flex gap-5 my-3 text-gray-400   " onClick={e => e.stopPropagation()} >

                                                    <p className="border px-3 rounded-xl">{uploadedDocuments[val?.name]}</p>
                                                    <IoMdCloseCircle className="text-2xl cursor-pointer" onClick={e => removeUpload(val.name)} />
                                                </div>
                                            ) : <IoCloudUploadSharp className="w-10 h-10 cursor-pointer duration-500 " />
                                            }

                                            <input type="file" accept=".pdf" className="border" name={val.name} id={val.name} onChange={handleUploadChange} style={{ display: 'none' }} />
                                        </div>
                                        <hr className="border-b border-gray-500 w-2/3" />

                                    </span>



                                ))

                            )}

                            {showUploadButton ?
                                <div className="flex justify-end  mr-7 mb-3 " >
                                    <button className="border p-1  px-5 rounded-2xl hover:bg-button " onClick={handleUpload}  > {buttonLoading ? <l-ring-2
                                        size="25"
                                        stroke="5"
                                        stroke-length="0.25"
                                        bg-opacity="0.1"
                                        speed="0.8"
                                        color="white"

                                    ></l-ring-2> : "upload"}</button>
                                </div>
                                : ''

                            }

                        </div>




                    </motion.div>

                </div>
                <ConnectedVentureTable data={result} />

            </div>


        </div>

    )
}

export default Uprofile