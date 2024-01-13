import { useEffect, useState } from "react";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { easeInOut, motion } from 'framer-motion'
import Card from "../common/Card";
import { useDispatch } from "react-redux";
import { USER_SRV_BASE_URL, VENTURE_SRV_BASE_URL } from "../../../data/const";
import { fetchData } from "../../../redux/api/api";
import CommentModal from "../common/CommentModal";
import Feedback from "../common/Feedback";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Background = () => {



  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [arr, setArr] = useState([])
  const navigate=useNavigate()

  const handleInputChange = () => {
    setShowCountries(true);
  };
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    console.log("selected country", country)
    setShowCountries(false);
    navigate(`ventureList/${country}`)


  };

  const dispatch = useDispatch()
  const [allComments, setAllComments] = useState([])
  const [show, setShow] = useState(false)
  let handleShow = () => setShow(false)

  //taking all comments
  const getAllComments = async () => {

    const apiDetails = {
      method: 'get',
      url: USER_SRV_BASE_URL + "get/all/comment",
      data: null,
      token: false,
      to: 'user'
    }
    const response = await dispatch(fetchData(apiDetails))
    console.log('all comments', response)
    setAllComments(response?.payload?.data)

  }
  const getAllContries = async () => {

    try {

      const apiDetails = {
        method: "get",
        url: VENTURE_SRV_BASE_URL + "get/all/contries",
        data: null,
        token: false,
        to: 'user'

      }
      const response = await dispatch(fetchData(apiDetails))
      console.log("all contries",response)
      let countries=response?.payload?.data?.response?.countries
      setArr(countries)
    } catch (error) {
      console.log('error occured while taking contries', error)
    }


  }
  useEffect(() => {

    getAllComments()
    getAllContries()
  }, [])




  const comment_url = USER_SRV_BASE_URL + `create/comment`

  const commentUpdated = () => getAllComments()

  console.log("all contries state", arr)
  return (
    <div className="bg-primary">
      <Navbar />


      <div className="flex flex-col justify-center items-center px-16 mb-0  bg-primary">


        <div className=" w-full   ">
          {/* home page first screeen  */}
          <div className="h-screen  mt-14 "  >
            <div className="flex flex-row  h-5/6 font-Outfit " >

              {/* first half */}
              <div className="w-1/2  flex items-start ">

                {/* Text section */}

                <div className=" h-full flex items-center  text-gray-300 pb-14   ">
                  <div className="flex flex-col  ">
                    <div className="text-gray-300 font-bold leading-tight font-Outfit tracking-wider text-4xl">
                      Discover <br /> Opportunities to Transform  Your <br /> Career and Achieve <br /> Success
                    </div>
                    <p className="text-gray-300 font-Outfit  text-base mt-3">Empowering dreams and connecting individuals <br />with trusted visa ✈</p>                    <div className="mt-3">
                      {/* <button className="text-gray-300 font-Outfit border-transparent shadow-2xl shadow-purple-950 hover:bg-transparent hover:border-white hover:border-y mr-5 rounded-3xl bg-sec-button px-6 pr-16 py-2.5">More&nbsp;</button>
                      <button className="text-gray-300 font-Outfit shadow-2xl shadow-purple-950 hover:border-transparent hover:bg-sec-button rounded-3xl border px-6 pr-14 py-2.5">About us</button> */}
                      {/* <input type="text" className="p-2 w-1/2 rounded-3xl bg-transparent border hover:bg-button text-gray-300" placeholder="&#128270; choose you're destination" /> */}
                      <input
                        type="text"
                        className="p-2 w-1/2 rounded-3xl bg-transparent border hover:bg-button text-gray-300"
                        placeholder="&#128270; Choose your destination  "
                        onClick={handleInputChange}
                        value={selectedCountry}
                      />
                      {showCountries && (
                        <div className=" rounded-xl mt-3 p-2 bg-secondory h-[250px] overflow-y-auto ">
                          {arr.map((country, index) => (

                            <div

                              key={index}
                              onClick={() => handleCountrySelect(country)}
                              className="cursor-pointer hover:bg-gray-500 p-1 rounded-lg"
                            >

                              {country}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* text section end */}
              </div>
              {/* second half */}
              <div className="w-1/2 flex items-center">

                {/* image section */}
                <div className="flex mb-16 items-center">
                  <div className=" h-full">
                    <motion.img
                      initial={{ x: '5vh' }}
                      animate={{ x: '-5vh' }}
                      exit={{ x: '5vh' }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut'
                      }}
                      src="/home-bg-removed.png" alt="Your Image" className="w-6/7 mr-16 max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>

            </div>
            <h1 className="text-gray-300 text-center font-Outfit text-5xl font-bold " >Top ventures</h1>
          </div>


          <Card />

          {/* Home page second screeen */}
          <div className="h-screen mt-24   " >
            <div className="  flex flex-row  h-5/6 font-Outfit    " >

              <div className="w-1/2 flex justify-start items-center ">

                {/* image section */}

                <div className="flex mb-16 ">
                  <div className=" h-full">
                    <motion.img
                      // initial={{ x: '5vh' }}
                      // animate={{ x: '-5vh' }}
                      // exit={{ x: '5vh' }}
                      // transition={{
                      //   duration: 5,
                      //   repeat: Infinity,
                      //   repeatType: 'mirror',
                      //   ease: 'easeInOut'
                      // }}
                      src="/Home-screen-2/people-handshake.png" alt="Your Image" className="w-6/7 mr-16 max-h-full object-contain"
                    />
                  </div>
                </div>

              </div>
              <div className="w-1/2  flex justify-center items-center ">



                {/* Text section */}
                <div className=" h-full flex items-center  pb-14   ">
                  <div className="flex flex-col">
                    <div className="text-gray-300 font-bold leading-tight font-Outfit tracking-wider text-4xl">
                      Connecting Dreams, One Aspiration <br /> at a Time,<br /> Your Gateway to Success
                    </div>
                    <p className="text-gray-300 font-Outfit  text-base mt-3">Empowering dreams and connecting individuals <br />with trusted visa ✈</p>                    <div className="mt-3">
                      <button className="text-gray-300 font-Outfit border-transparent shadow-2xl shadow-purple-950 hover:bg-transparent hover:border-white hover:border-y mr-5 rounded-3xl bg-sec-button px-6 pr-16 py-2.5">More&nbsp;</button>
                      <button className="text-gray-300 font-Outfit shadow-2xl shadow-purple-950 hover:border-transparent hover:bg-sec-button rounded-3xl border px-6 pr-14 py-2.5">About us</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>



          {/* Home page Third screen */}
          <div className="" >
            <div className="   h-5/6 font-Outfit " >


              {/* Testimonals */}
              <div className=" w-full  flex justify-center ">
                <div className=" w-80 ">

                  <p className="text-gray-300  font-bold flex justify-center ">TESTIMONALS</p>
                  <p className=" text-gray-300 flex justify-center font-bold text-4xl" >Read What Others <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Have to Say</p>
                </div>



              </div  >



              <div className="flex  flex-col items-center text-gray-300 m-14  ">
                <CommentModal show={show} onClose={handleShow} allComments={allComments} />
                <div className=" flex flex-row w-5/6 h-3/6  text-white font-Outfit" >

                  {allComments?.slice(0, 4).map((val) => (

                    <motion.div initial={{ scale: 1 }} key={val._id} whileHover={{ scale: 1.1 }} className="flex-1  m-3 py-14  rounded-xl bg-secondory flex justify-center pt-3 px-1 h-full flex-col shadow-2xl shadow-black ">

                      <div className="w-full h-2/6  flex justify-center " >

                        <div className=" w-1/2  h-full rounded-full overflow-hidden " >
                          <img src="user-avatar.jpg" className="w-full  h-auto object-cover" alt="user-profile" />
                        </div>

                      </div>
                      {/* <div className="border">helo</div> */}
                      <p className="text-center">{val?.userId?.username}</p>
                      <div className="w-full h-4/6 pt-2 px-2" >

                        <div className=" w-full h-full  flex overflow-hidden  text-gray-300 " >

                          <p className=" h-[90px]  text-overflow-ellipsis w-[200px] " >{val.content}</p>
                        </div>
                      </div>

                    </motion.div>

                  ))}

                </div>
                <div className="w-5/6 h-1/12  flex   " >
                  <div className="w-6/12" ></div>
                  <div className="w-6/12 flex justify-end items-start " >

                    {allComments?.length > 4 ? <button className="border p-2 px-7 rounded-full mr-4 hover:bg-button" onClick={e => setShow(true)} >More</button> : ''}
                  </div>

                </div>


              </div>
              <Feedback comment_url={comment_url} commentUpdated={commentUpdated} />
            </div>

          </div>
        </div>


      </div>


    </div>
  );
}

export default Background;
