import { motion } from "framer-motion"
import { useState } from "react"
import CommentModal from "./CommentModal"
import StartRating from "react-stars"
const Comment=({allComments,comments})=>{

    const [show, setShow] = useState(false)
    let handleShow = () => setShow(false)

    return (

        <div className="flex  flex-col items-center  text-gray-300 m-14  ">
        <CommentModal show={show} onClose={handleShow} allComments={allComments} comments={comments} />
        <div className={` flex flex-row  h-3/6 overflow-hidden   text-white  font-Outfit`} >

          { allComments?.length!==0 && allComments?.slice(0, 4).map((val) => (

            <motion.div initial={{ scale: 1 }} key={val._id} whileHover={{ scale: 1.1 }} className={`flex-1  m-3 py-5  rounded-xl bg-secondory flex justify-center pt-3 px-1 h-full w-[200px] flex-col shadow-2xl shadow-black `}>

              <div className="w-full h-2/6  flex justify-center " >

                <div className=" w-1/2  h-full rounded-full overflow-hidden " >
                  <img src={ val?.userId?.profile_image ??"/user-avatar.jpg"} className="w-[150px]  h-[90px] object-cover" alt="user-profile" />
                </div>

              </div>
             
              <p className="text-center">{comments==="venture"?val?.userName:val?.userId?.username}</p>
              <div className="w-full h-4/6 pt-2 px-2  " >

                <div className=" w-full h-full  flex  overflow-hidden break-words  text-gray-300 " >

                  <p className=" h-[90px]  text-overflow-ellipsis w-[200px] " >{val?.content}</p>
                  
                
                </div> 
                <div>  {val?.rating ? <StartRating count={5} value={val?.rating} size={30} edit={false} />:null}</div>
               
              </div>

            </motion.div>

          ))}

        </div>
        <div className="w-full h-1/12  flex   " >
          <div className="w-6/12" ></div>
          <div className="w-6/12 flex justify-end items-start " >

            {allComments?.length > 4 ? <button className="border p-2 px-7 rounded-full mr-4 hover:bg-button" onClick={e => setShow(true)} >More</button> : ''}
          </div>

        </div>


      </div>
    )

}

export default Comment