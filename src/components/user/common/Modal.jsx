import { useEffect, useState } from "react"
import { USER_SRV_BASE_URL } from "../../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
const Modal = ({ visible, onClose, connectUser, id }) => {

    if (!visible) return null

    const [userId, setUserId] = useState('')

    //assign use dispatch to a variable
    const dispatch = useDispatch()

    //userId state
    const [userCred, setUserCred] = useState('')

    //this function will be close the modal
    const handleOnClose = () => onClose()


    //this function handling Connecting user Request
    const handleRequest = () => connectUser(id, venture, userId)

    //taking user Details api destination
    const takeUserdetails = async () => {

        const apiDetails = {
            method: 'get',
            url: USER_SRV_BASE_URL + 'getUser',
            data: null,
            token: true,
            to: 'user'
        }
        const response = await dispatch(fetchData(apiDetails))
        setUserCred(response?.payload?.data?.response?.ventures)
        setUserId(response?.payload?.data?.response?._id)

    }
    //This user connected ventures Array of object
    let temp = userCred
    let k = Array?.from(temp&&temp);
    
    //if user connected multiples venture array contain multiple id s..so in this synario we should know
    //showing ventture wthere already connected or not ?
    const venture = k?.find(venture => venture.ventureId === id);




    useEffect(() => {
        takeUserdetails()

    }, [])

    return (

        <div className="h-full w-full backdrop-blur-sm backdrop-brightness-50 top-0 left-0 flex justify-center items-center z-50 fixed  " onClick={handleOnClose} >
            <div className="bg-secondory h-1/3  rounded-3xl   w-1/6 " onClick={e => e.stopPropagation()} >

                {
                    <div className="justify-center items-center font-Outfit  flex w-full h-full ">
                        {console.log('statu check',venture)}
                        <button className="border p-3 rounded-3xl hover:bg-button " onClick={handleRequest} >{venture && venture?.status === 'allowed' ? <p>  Make a Chat</p> : <p>📞Request for a Call</p>}</button>
                    </div>
                }
            </div>
        </div>
    )


}

export default Modal