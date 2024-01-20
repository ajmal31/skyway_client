import { motion } from "framer-motion"
import "../../../scroll.css"
const CommentModal = ({ show, onClose, allComments,comments }) => {
    if (!show) return null

    const handleClose = () => onClose()
    return (
        <div className="h-full w-full fixed  top-0 left-0 flex justify-center items-center z-50 backdrop-blur-sm backdrop-brightness-50 " onClick={handleClose} >
            <div className="h-5/6 w-5/6  flex justify-center items-center">

                {/* Modal content */}
                <div className="h-full w-full overflow-y-auto">

                    {/* Container for the cards with fixed height */}
                    <div className={`grid grid-cols-5 ${allComments?.length<=5 ?`h-1/2`: `h-full` } w-full gap-4`}  >

                        {/* Map over the first 10 elements of the array and generate the card elements */}
                        { allComments?.length!==0&& allComments?.map((item, index) => (
                            <motion.div initial={{ scale: 1 }} key={index} whileHover={{ scale: 1.1 }} className="flex-1  m-3 rounded-xl bg-secondory flex justify-center pt-3 px-1  flex-col shadow-2xl shadow-black h-full" onClick={e => e.stopPropagation()}>

                                <div className="w-full h-2/6  flex justify-center " >
                                    <div className=" w-1/2  h-full rounded-full overflow-hidden " >
                                        <img src="/user-avatar.jpg" className="w-full  h-auto object-cover" alt="user-profile" />
                                    </div>
                                </div>
                                <p className="text-center">{comments==="venture"?item?.userName:item?.userId?.username}</p>
                                <div className="w-full h-4/6 p-2" >

                                    <div className=" w-full h-full flex overflow-hidden  text-gray-300 " >

                                        <p>{item?.content}</p>
                                    </div>
                                </div>

                            </motion.div>
                        ))}

                    </div>

                </div>

            </div>
        </div>
    );
}

export default CommentModal;
