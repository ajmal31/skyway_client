import { useDispatch } from "react-redux"
import Navbar from "../Home/Navbar"
import { userLogout } from "../../../redux/slices/UserSlice"
import { useEffect, useState } from "react"
import { USER_SRV_BASE_URL } from "../../../data/const"
import { fetchData } from "../../../redux/api/api"
import { ToastContainer } from "react-toastify"
import { useme } from "../../../hooks/toast"
import { changeUsername } from "../../../redux/slices/UserSlice"
import Modal from "../modal/Modal"
const Uprofile = () => {

    const [userCred, setUserCred] = useState({})
    const [edit, setEdit] = useState(false)

    const [updateUserCred, setUpdateUserCred] = useState({
        username: userCred?.username,
        email: "",
        region: "",
        destination: "",
        phone: ""

    })

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
        const success = 'success';
        console.log('email in update button', userCred?.email)
        if (userCred?.username.length <= 0) useme("please enter a valid name", error)
        else if (!/^.+@.+\.[a-zA-Z]{2,3}$/.test(userCred.email)) useme("enter a valid email", error)
        else if (userCred?.email?.length > 30) useme('Email limit exceeded', error);
        else if (numberLen !== 10) useme('Please enter a valid number', error);
        else if (regionLen < 2) useme('Please enter a valid region', error);
        else if (destLen < 2) useme('Please enter a valid destination', error);
        else {

            setEdit(false)
            console.log('inside the update button', userCred)

            const obj = {
                method: 'post',
                url: USER_SRV_BASE_URL + 'updateUser',
                data: userCred,
                token: true,
                to: 'user'
            }
            const response = await dispatch(fetchData(obj))
            dispatch(changeUsername(response?.payload?.data?.response?.username))
            useme("Profile Updated", 'info')

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
        console.log('response of the api call', response)
        setUserCred(response?.payload?.data?.response)

    }
    console.log('response in userProfile', userCred)
    useEffect(() => {

        getUserDetails()

    }, [])

    //modal
    const [visible, setVisible] = useState(false)
    const handlVisible =()=> setVisible(false)

    return (

        <div className="bg-primary w-screen  h-screen">

            <Navbar />

            <Modal visible={visible} onClose={handlVisible} phoneNumber={userCred?.phone} />


            <div className=" w-full flex px-16 pt-10 flex-col text-gray-200 font-Outfit ">


                <div className=" flex   " >

                    <div className="w-1/2 m-2 bg-secondory flex rounded-2xl">


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
                                    {!edit && !userCred?.phoneVerifcation ? <button className="border border-gray-500 px-1 rounded-xl" onClick={e=>setVisible(true)} >Verify Number ?</button> : ''}
                                    {!edit ?

                                        <button onClick={e => setEdit(true)} className="ml-4" >Edit</button>
                                        : <button onClick={updateButton} className="ml-4" >update</button>}

                                </div>
                            </div>



                        </div>

                    </div>
                    <div className="w-1/2 m-2 bg-gray-500"> documents section </div>
                </div>
            </div>

            <ToastContainer />
        </div>

    )
}

export default Uprofile