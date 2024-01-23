import About from "../ventureDetails/About"
import Card from "./Card"
import Graph from "./Graph"
import Feedback from "./Feedback"
import Modal from "./Modal"
import { useEffect, useState } from "react"
import { useme } from "../../../hooks/toast"
import { VENTURE_SRV_BASE_URL, USER_SRV_BASE_URL, CHAT_SRV_BASE_URL } from "../../../data/const"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { IoIosChatboxes } from "react-icons/io";
import Comment from "./Comments"
import Footer from "./Footer"

const BgBox = ({ id }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ventureData, setVentureData] = useState({})
  const [allComments, setAllComments] = useState([])
  const userName = localStorage.getItem("username")
  //taking particular venture details
  const getOneVenture = async () => {

    const obj = {
      method: 'get',
      url: VENTURE_SRV_BASE_URL + `getOneVenture/${id}`,
      data: null,
      token: false,
      to: "venture"
    }
    const response = await dispatch(fetchData(obj))
    setVentureData(response?.payload?.data)

  }

  //get all comments
  const getAllComments = async () => {

    const apiDetails = {
      method: 'get',
      url: VENTURE_SRV_BASE_URL + `get/all/comments/${id}`,
      data: null,
      token: false,
      to: 'user'
    }
    const response = await dispatch(fetchData(apiDetails))
    setAllComments(response?.payload?.data)

  }

  //Invoking in the initial stage 
  useEffect(() => {

    getOneVenture()
    getAllComments()
  }, [])

  const [visible, setVisible] = useState(false)

  //Closing the modal
  const handleOnClose = () => setVisible(false)
  const handleRequest = async (vid, venture, userId) => {

    if (venture?.status === 'allowed') {

      // create chat 

      //chat service api details
      const apiDetails = {
        method: 'post',
        url: CHAT_SRV_BASE_URL + 'createChat/user',
        data: { ventureId: vid, userId: userId },
        token: true,
        to: 'user'
      }
      //venture service api details
      const apiDetails_two = {
        method: 'post',
        url: VENTURE_SRV_BASE_URL + 'getVentureUpdateChat/user',
        data: { vid: vid },
        token: true,
        to: 'user'
      }
      //User service api details
      const apiDetails_three = {
        method: 'post',
        url: USER_SRV_BASE_URL + 'getUserUpdateChat/user',
        data: { userId: userId },
        token: true,
        to: 'user'
      }
      //creating chat
      let chatCreated = await dispatch(fetchData(apiDetails))
      //take data from venture Hear receiver id represing the 
      //venture( hear will be only boolen while RabbitMQ make
      // request so handle it using that boolean)👆

      //This api call taken venture details based on the id and 
      //update to chat service👇
      let ventureData = await dispatch(fetchData(apiDetails_two))

      //This api call take user details based ont he id and 
      //update to chat service👇
      let userData = await dispatch(fetchData(apiDetails_three))
      navigate('/chats')
    }
    else {
      const obj = {
        method: 'post',
        url: USER_SRV_BASE_URL + 'callRequested',
        data: { ventureId: vid },
        token: true,
        to: 'user'
      }
      const response = await dispatch(fetchData(obj))
      const { data } = response?.payload
      console.log('after request msg', data)
      if (data && data === "You Already Requested This venture. please wait for their response" || "Please verify your number") {
        console.log('enter restricted area')
        useme(data, 'warning')
      }
      else useme(data, 'success')
    }



  }

  const [shouldShimmer, setShouldShimmer] = useState(false);

  //let connect button jump in each an every second
  useEffect(() => {
    const interval = setInterval(() => {
      setShouldShimmer(prev => !prev);
    }, 500); // Adjust this duration as per your preference

    return () => clearInterval(interval);
  }, []);

  const comment_url = VENTURE_SRV_BASE_URL + `create/comment`
  const data = { vid: id, userName: userName }
  const commentUpdated = () => getAllComments()


  return (



    <div className=" bg-primary text-gray-300 h-full w-full mt-10   rounded-3xl  " >

      <motion.button
        animate={{ scale: shouldShimmer ? 1.05 : 1 }}
        transition={{ duration: 0.25 }} // Adjust the duration if needed
        className="border p-2 hover:bg-button rounded-xl font-Outfit  " onClick={e => setVisible(true)} >
        <p className="flex text-green-500 ">  <IoIosChatboxes className="mt-2" /> &nbsp;connect with us</p>
      </motion.button>
      {/* PASS TO MODAL VENTURE ID */}
      <Modal visible={visible} onClose={handleOnClose} connectUser={handleRequest} id={ventureData?._id} />


      <p className="text-4xl font-Outfit my-6"><a href={ventureData?.website_link} target="_blank" rel="noopener noreferrer" >About us</a></p>
      <About content={ventureData?.description} />

      {/* <p className="text-4xl my-8 text-center font-Outfit">Our Main Destinations</p>
      <Card /> */}

      <p className="text-4xl text-center my-8 font-Outfit">Insurance & License</p>
      <Card certificates={true} insurance={ventureData?.insurance_file_link} license={ventureData?.license_file_link} />
      <p className="text-4xl text-center my-8 font-Outfit">Testimonals of {ventureData?.ventureName}</p>
      {/* <Graph /> */}
      <Comment allComments={allComments} comments={"venture"} />
      <p className="text-4xl text-center my-8 font-Outfit">Point Out Your Valuable Words About us</p>
      <Feedback comment_url={comment_url} data={data} commentUpdated={commentUpdated} roll={"venture"} />
      <Footer />

    </div>

  )


}
export default BgBox