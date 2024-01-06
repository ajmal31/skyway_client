import { useEffect, useState } from "react";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { easeInOut, motion } from 'framer-motion'
import Card from "../common/Card";
import { useDispatch } from "react-redux";
import { USER_SRV_BASE_URL } from "../../../data/const";
import { fetchData } from "../../../redux/api/api";
import CommentModal from "../common/CommentModal";

const Background = () => {

  const dispatch = useDispatch()
  const [allComments, setAllComments] = useState([])
  const [show,setShow]=useState(false)
  let handleShow=()=>setShow(false)

  const getAllComments = async () => {

    const apiDetails = {
      method: 'get',
      url: USER_SRV_BASE_URL + "get/all/comment",
      data: null,
      token: false,
      to: 'user'
    }
    const response = await dispatch(fetchData(apiDetails))
    console.log('all comments',response)
    setAllComments(response?.payload?.data)

  }
  useEffect(() => {

    getAllComments()
  }, [])

  console.log('state',allComments)

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

                <div className=" h-full flex items-center  pb-14   ">
                  <div className="flex flex-col">
                    <div className="text-gray-300 font-bold leading-tight font-Outfit tracking-wider text-4xl">
                      Discover <br /> Opportunities to Transform  Your <br /> Career and Achieve <br /> Success
                    </div>
                    <p className="text-gray-300 font-Outfit  text-base mt-3">Empowering dreams and connecting individuals <br />with trusted visa ✈</p>                    <div className="mt-3">
                      <button className="text-gray-300 font-Outfit border-transparent shadow-2xl shadow-purple-950 hover:bg-transparent hover:border-white hover:border-y mr-5 rounded-3xl bg-sec-button px-6 pr-16 py-2.5">More&nbsp;</button>
                      <button className="text-gray-300 font-Outfit shadow-2xl shadow-purple-950 hover:border-transparent hover:bg-sec-button rounded-3xl border px-6 pr-14 py-2.5">About us</button>
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

            

              <div className="flex h-screen flex-col items-center text-white m-10  ">
               <CommentModal show={show} onClose={handleShow} allComments={allComments} />
                <div className=" flex flex-row w-5/6 h-3/6 border-red-500 text-white font-Outfit" >
                 
                  {allComments?.slice(0,4).map((val) => (
                    
                    <motion.div initial={{ scale: 1 }} key={val._id} whileHover={{ scale: 1.1 }} className="flex-1  m-3 rounded-xl bg-secondory flex justify-center pt-3 px-1  flex-col shadow-2xl shadow-black ">
                     {console.log('helo')}
                      <div className="w-full h-2/6  flex justify-center border-red-500" >
                        <div className=" border-yellow-500 w-1/2  h-full rounded-full overflow-hidden " >
                          <img src="user-avatar.jpg" className="w-full  h-auto object-cover" alt="user-profile" />
                        </div>
                      </div>
                      <div className="w-full h-4/6 p-2" >

                        <div className=" w-full h-full flex overflow-hidden  text-gray-300 " >

                          <p>{val.content}</p>
                        </div>
                      </div>

                    </motion.div>

                   ))} 
                  
                </div>
                <div className="w-5/6 h-1/6  flex  " >
                 <div className="w-6/12" ></div>
                 <div className="w-6/12 flex justify-end items-start " >

                 {allComments?.length >4 ?<button className="border p-2 px-7 rounded-full mr-4 hover:bg-button" onClick={e=>setShow(true)} >More</button>:''}
                 </div>
                   
                </div>
                
              </div>
              
            </div>
                
          </div>
        </div>


      </div>


    </div>
  );
}

export default Background;
