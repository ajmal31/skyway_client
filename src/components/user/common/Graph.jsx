import { motion } from "framer-motion"
const Graph = () => {

    const allComments=[
        1,2,3,4,5,6
    ]

    return (

        <div className="flex  flex-col items-center  text-gray-300 m-14 border ">
            {/* <CommentModal show={show} onClose={handleShow} allComments={allComments} /> */}
            <div className=" flex flex-row  h-3/6  text-white  font-Outfit" >

                {allComments?.slice(0, 4).map((val) => (

                    <motion.div initial={{ scale: 1 }} key={val._id} whileHover={{ scale: 1.1 }} className="flex-1  m-3 py-14  rounded-xl bg-secondory flex justify-center pt-3 px-1 h-full flex-col shadow-2xl shadow-black ">

                        <div className="w-full h-2/6  flex justify-center " >

                            <div className=" w-1/2  h-full rounded-full overflow-hidden " >
                                <img src="/user-avatar.jpg" className="w-full  h-auto object-cover" alt="user-profile" />
                            </div>

                        </div>
                        {/* <div className="border">helo</div> */}
                        
                        <p className="text-center">username</p>
                        <div className="w-full h-4/6 pt-2 px-2" >

                            <div className=" w-full h-full  flex overflow-hidden  text-gray-300 " >

                                <p className=" h-[90px]  text-overflow-ellipsis w-[200px] " >comment </p>
                            </div>
                        </div>

                    </motion.div>

                ))}

            </div>
            {/* <div className="w-full h-1/12  flex   " >
                <div className="w-6/12" ></div>
                <div className="w-6/12 flex justify-end items-start " >

                    {allComments?.length > 4 ? <button className="border p-2 px-7 rounded-full mr-4 hover:bg-button" onClick={e => setShow(true)} >More</button> : ''}
                </div>

            </div> */}


        </div>

    )


}

export default Graph