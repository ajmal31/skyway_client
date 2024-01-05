import { motion } from "framer-motion"
import { MdDownloadForOffline } from "react-icons/md";
const ShowingUserDetails = () => {

    const div1 = {
        initial: { translateY: -100 },
        animate: { translateY: 0 },
        transition: { duration: 0.2, ease: 'easeIn' }

    }
    const div2 = {
        initial: { translateY: -100 },
        animate: { translateY: 0 },
        transition: { duration: 0.4, ease: 'easeIn' }

    }
    const div3 = {
        initial: { translateY: -100 },
        animate: { translateY: 0 },
        transition: { duration: 0.6, ease: 'easeIn' }

    }
    const div4 = {
        initial: { translateY: -100 },
        animate: { translateY: 0 },
        transition: { duration: 0.8, ease: 'easeIn' }

    }
    const style = {
        className: "border w-4/12 flex flex-col rounded-2xl bg-admin-secondory shadow-xl hover:bg-gray-400 duration-500 items-center "
    }
    const documentlabels = [
        { title: "GovId", Link: "#" },
        { title: "Adhar", Link: "#" },
        { title: "Pancard", Link: "#" },
        { title: "Passport", Link: "#" }
    ]

    return (
        <div className="flex gap-4 h-full w-full text-gray-400 font-Outfit " >



            <div className="w-1/2 h-1/2  rounded-2xl bg-primary shadow-2xl hover:border-b-2 p-2 border-gray-500 ">


                <div className="h-full w-full flex-col space-y-3 ">


                    <div className=" w-full h-full flex  flex-col mt-2 items-center  " >

                        <p className="font-semibold" >AJMAL DOCUMENTS</p>
                        <div className="border-l-2 border-gray-300 rounded-lg pt-5 pl-1 h-5/6 w-5/6 " >
                            {documentlabels?.map((val, index) => (
                                <div className="mt-2" >
                                    <div className=" w-1/2 flex justify-between items-center" >
                                        
                                        <a href={val.Link} target="_blank" >{val.title}</a>
                                        <MdDownloadForOffline className="cursor-pointer" />
                                    </div>

                                    <hr className="w-1/2 rounded-full " />
                                </div>

                            ))}


                        </div>

                    </div>


                    <div className="flex">




                    </div>


                </div>
            </div>
            <div className="w-1/2 h-1/2  rounded-2xl font-Outfit bg-primary shadow-lg hover:border-b-2 p-2 border-gray-500 ">

                <div className="h-full w-full  " >


                    {/* <div className=" w-full flex   flex-col mt-2 items-center  " >

                        <p className="font-semibold" >TOTAL USERS</p>

                    </div> */}
                    <div className="  h-4/5 flex justify-evenly">

                        <div className=" flex items-center flex-col  p-2 w-1/2 " >


                            <p className="flex justify-center text-2xl uppercase   rounded-2xl hover:underline hover:underline-offset-8  duration-700 transition">user status</p>
                            <div className="  flex flex-col justify-evenly w-full h-full">

                                <div className="  w-full h-1/2 flex  items-center justify-center ">
                                    <button className="" >pending</button>
                                </div>
                                <div className=" w-full h-1/2 flex  ">

                                    <div className="flex justify-center items-center w-1/2 " >
                                        <button className="border rounded-2xl h-2/5 flex justify-center items-center py-3 px-3 hover:bg-button " >Allow</button>
                                    </div>
                                    <div className=" flex justify-center items-center w-1/2 " >
                                        <button className="border rounded-2xl h-2/5 flex justify-center items-center py-3 px-3 hover:bg-button" >Reject</button>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className=" border-l w-1/2 "  >

                           <div className=" flex justify-center pt-2 h-1/5 " >
                            <p className="text-2xl uppercase">service status</p>
                           </div>
                           <div className=" flex justify-center items-center h-2/5 pt-2" >
                            <button className="border px-2 rounded-2xl" >start ajmal service</button>
                           </div>

                        </div>

                    </div>


                </div>

            </div>





        </div>
    )
}

export default ShowingUserDetails