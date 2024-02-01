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
import { useNavigate, Link } from "react-router-dom";
import Comment from "../common/Comments";
import Footer from "../common/Footer";

const Background = () => {



  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [arr, setArr] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [allComments, setAllComments] = useState([])
  const [topVentures, setTopVentures] = useState([])

  //Handle showing country List
  const handleInputChange = () => {
    setShowCountries(true);
  };
  //Handle selected country
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountries(false);
    navigate(`ventureList/${country}`)


  };


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

    setAllComments(response?.payload?.data)

  }
  //Taking all contry names
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
      console.log("all contries", response)
      let countries = response?.payload?.data?.response?.countries
      setArr(countries)
    } catch (error) {
      console.log('error occured while taking contries', error)
    }


  }
  //Get top 5 ventures
  const getTopVentures = async () => {

    console.log("is it enter")
    const apiDetails = {
      method: 'post',
      url: VENTURE_SRV_BASE_URL + "getAllVentures",
      data: { type: "allowed" },
      token: false,
      to: 'venture'
    }
    const response = await dispatch(fetchData(apiDetails))
    const { Allventures } = response?.payload?.data?.response
    // console.log("all venture oh home filter 5 items",Allventures)

    let k = Allventures.slice(0, 5)
    setTopVentures(k)

  }

  console.log("vnture state", topVentures)
  //useEffect
  useEffect(() => {

    getAllComments()
    getAllContries()
    getTopVentures()
  }, [])




  const comment_url = USER_SRV_BASE_URL + `create/comment`

  const commentUpdated = () => getAllComments()

  const [shouldShimmer, setShouldShimmer] = useState(false);

  //let connect button jump in each an every second
  useEffect(() => {
    const interval = setInterval(() => {
      setShouldShimmer(prev => !prev);
    }, 500); // Adjust this duration as per your preference

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-primary">
      <Navbar />


      <div className="flex flex-col justify-center items-center px-16 mb-0  overflow-hidden bg-primary">


        <div className=" w-full  borde ">
          {/* home page first screeen  */}
          <div className="lg:mb-14 sm:mb-10 mt-[120px]   "  >
            <div className="flex lg:flex-row sm:flex-col  lg:justify-start lg:items-start sm:justify-center sm:items-center h-5/6 font-Outfit " >

              {/* first half */}
              <div className="lg:w-1/2 sm:w-full  flex items-start ">

                {/* Text section */}

                <div className=" h-full flex lg:items-center  text-gray-300 pb-14   ">
                  <div className="flex flex-col sm:justify-center sm:items-center  lg:justify-start lg:items-start ">
                    <div className="text-gray-300 font-bold leading-tight sm:w-2/3 lg:w-full  font-Outfit tracking-wider sm:text-center lg:text-start  text-4xl">
                      Discover <br /> Opportunities to Transform  Your <br /> Career and Achieve <br /> Success
                    </div>
                    <p className="text-gray-300 font-Outfit sm:text-center lg:text-start text-base mt-3">Empowering dreams and connecting individuals <br />with trusted visa ✈</p>                    <div className="mt-3">
                      {/* <button className="text-gray-300 font-Outfit border-transparent shadow-2xl shadow-purple-950 hover:bg-transparent hover:border-white hover:border-y mr-5 rounded-3xl bg-sec-button px-6 pr-16 py-2.5">More&nbsp;</button>
                      <button className="text-gray-300 font-Outfit shadow-2xl shadow-purple-950 hover:border-transparent hover:bg-sec-button rounded-3xl border px-6 pr-14 py-2.5">About us</button> */}
                      {/* <input type="text" className="p-2 w-1/2 rounded-3xl bg-transparent border hover:bg-button text-gray-300" placeholder="&#128270; choose you're destination" /> */}
                      <motion.input
                        animate={{ scale: shouldShimmer ? 1.05 : 1 }}
                        transition={{ duration: 0.25 }} // Adjust the duration if needed

                       
                        type="text"
                        className="p-2  sm:w-full rounded-3xl bg-transparent border hover:bg-button  text-gray-300"
                        placeholder="&#128270; Choose your destination  "
                        onClick={handleInputChange}
                        value={selectedCountry}
                      />
                      {showCountries && (
                        <div className=" rounded-xl mt-3 p-2 bg-secondory z-50 h-[250px] w-2/3 overflow-y-auto ">
                          {arr?.length !== 0 ? arr?.map((country, index) => (

                            <div

                              key={index}
                              onClick={() => handleCountrySelect(country ?? '')}
                              className="cursor-pointer hover:bg-gray-500 p-1 rounded-lg"
                            >

                              {country ?? ''}
                            </div>
                          )) : <h1>Not countries found</h1>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* text section end */}
              </div>
              {/* second half */}
              <div className="w-1/2 flex items-center ">

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
           
          </div>

          <div>
            <Card topVentures={topVentures} />

          </div>

          {/* Home page second screeen */}
          {/* sm:flex-col sm:justify-center sm:items-center */}
          <div className="h-screen  mt-24 sm:border lg:border-none " >
            <div className="  flex lg:flex-row  h-5/6 font-Outfit    " >

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
                      src="/Home-screen-2/people-handshake.png" alt="Your Image" className="w-6/7 sm:bord lg:border-none er mr-16 max-h-full object-contain"
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
                      <Link to={'/ventureList'} > <button className="text-gray-300 font-Outfit border-transparent shadow-2xl shadow-purple-950 hover:bg-transparent hover:border-white hover:border-y mr-5 rounded-3xl bg-sec-button px-6 pr-16 py-2.5">More&nbsp;</button></Link>
                      <Link to={'/about'} >  <button className="text-gray-300 font-Outfit shadow-2xl shadow-purple-950 hover:border-transparent hover:bg-sec-button rounded-3xl border px-6 pr-14 py-2.5"> About us </button></Link>
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


              <Comment allComments={allComments ?? ''} />

              <Feedback comment_url={comment_url} commentUpdated={commentUpdated} />
            </div>

          </div>
          <div className="text-gray-300" >
            <Footer />
          </div>
        </div>


      </div>


    </div>
  );
}

export default Background;
