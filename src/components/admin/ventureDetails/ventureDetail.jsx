import { motion } from "framer-motion"
const VentureDetail = () => {


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



    const documentLabels = [
        {
            title: 'portfolio ',
            link: '#'
        },
        {
            title: 'website Link ',
            link: '#'
        },
        {
            title: 'insurance',
            link: '#'
        },
        {
            title: 'license',
            link: '#'
        },
        {
            title: 'Registration Number',
            link: "#",


        },
        {
            title: 'License Number',
            link: "#",


        },



    ]

    return (


        <div className="bg-admin-secondory shadow-2xl p-10   font-Outfit w-10/12 rounded-2xl" >


            <div className="flex gap-4 h-full w-full " >



                <div className="w-1/2 h-1/2  rounded-2xl bg-admin-primary shadow-lg hover:border-b-2 p-2 border-blue-600 ">


                    <div className="h-full w-full flex-col space-y-3 ">
                        {documentLabels?.map((val, index) => (
                            <div>
                                <a href={val?.link} className="border-2 hover:bg-gray-500 rounded-2xl   px-5" >{val?.title}</a>
                            </div>


                        ))}



                    </div>
                </div>
                <div className="w-1/2 h-1/2  rounded-2xl font-Outfit bg-admin-primary shadow-lg hover:border-b-2 p-2 border-blue-600 ">

                    <div className="h-full w-full " >


                        <div className=" w-full h-2/5 flex  flex-col mt-2 items-center  " >

                            <p className="font-semibold" >TOTAL USERS</p>
                            <p className="text-4xl" >567000M</p>
                        </div>
                        <div className=" w-full h-2/5 flex justify-between space-x-1 px-2">

                            <motion.div {...div1} {...style}>
                                <p>Completed</p>
                                <p className="text-2xl" >1000</p>

                            </motion.div>
                            <motion.div {...div2}  {...style}>
                                <p>Approved</p>
                                <p className="text-2xl" >1000</p>

                            </motion.div>
                            <motion.div {...div3} {...style}>
                                <p>pending</p>
                                <p className="text-2xl" >1000</p>

                            </motion.div>
                            <motion.div {...div4} {...style}>
                                <p>Rejected </p>
                                <p className="text-2xl" >1000</p>

                            </motion.div>
                            

                        </div>

                    </div>

                </div>





            </div>

        </div>
    )


}

export default VentureDetail