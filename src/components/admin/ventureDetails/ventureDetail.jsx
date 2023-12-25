import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { USER_SRV_BASE_URL, VENTURE_SRV_BASE_URL } from "../../../data/const"
import { fetchData } from "../../../redux/api/api"
import { useDispatch } from "react-redux"
const VentureDetail = ({ vid }) => {

    const dispatch = useDispatch()
    const [ventureDetails, setVentureDetails] = useState({})
    const [completedUsers, setCompletedUsers] = useState(0)
    const [allowedUsers, setAllowedUsers] = useState(0)
    const [pendingUsers, setPendingUsers] = useState(0)
    const [rejectedUsers, setRejectedUsers] = useState(0)
    const [allUsers, setAllUsers] = useState(0)


    const getVentureData = async () => {

        const apiDetails = {
            method: 'get',
            url: VENTURE_SRV_BASE_URL + `getOneVenture/admin/${vid}`,
            data: null,
            token: true,
            to: "admin"
        }
        const response = await dispatch(fetchData(apiDetails))
        setVentureDetails(response?.payload?.data)
    }
    const getVentureRelatedUserUsers = async (status) => {

        const apiDetails = {
            method: 'get',
            url: USER_SRV_BASE_URL + `venture/users/${status}/count/${vid}`,
            data: null,
            token: true,
            to: 'admin'
        }

        const response = await dispatch(fetchData(apiDetails))
        const count = response?.payload?.data
        switch (status) {
            case "completed":
                setCompletedUsers(count)
                break
            case "allowed":
                setAllowedUsers(count)
                break
            case "pending":
                setPendingUsers(count)
                break;
            case "rejected":
                setRejectedUsers(count)

        }

    }
    const getAllusers = async () => {

        const apiDetails = {
            method: 'get',
            url: USER_SRV_BASE_URL + `venture/all/users/count/${vid}`,
            data: null,
            token: true,
            to: 'admin'
        }
        const response = await dispatch(fetchData(apiDetails))
        const count = response?.payload?.data
        setAllUsers(count)

    }

    useEffect(() => {

        getVentureData()
        getAllusers()
        getVentureRelatedUserUsers("completed")
        getVentureRelatedUserUsers("allowed")
        getVentureRelatedUserUsers("pending")
        getVentureRelatedUserUsers("rejected")


    }, [])

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
            link: ventureDetails?.official_portfolio
        },
        {
            title: 'website Link ',
            link: ventureDetails?.website_link
        },
        {
            title: 'insurance',
            link: ventureDetails?.insurance_file_link
        },
        {
            title: 'license',
            link: ventureDetails?.license_file_link
        }



    ]

    return (


        <div className="bg-admin-secondory shadow-2xl p-10   font-Outfit w-10/12 rounded-2xl" >


            <div className="flex gap-4 h-full w-full " >



                <div className="w-1/2 h-1/2  rounded-2xl bg-admin-primary shadow-lg hover:border-b-2 p-2 border-blue-600 ">


                    <div className="h-full w-full flex-col space-y-3 ">
                        {documentLabels?.map((val, index) => (
                            <div>
                                <a href={val?.link} target="_blank" rel="noopener noreferrer" className="border-2 hover:bg-gray-500 rounded-2xl   px-5" >{val?.title}</a>
                            </div>


                        ))}
                        <div className="flex">

                            <a href="" className="border-2 hover:bg-gray-500 rounded-2xl mr-1 px-5" >License Number {ventureDetails?.license_number}</a>
                            <a href="" className="border-2 hover:bg-gray-500 rounded-2xl   px-5" >Register Number {ventureDetails?.register_number}</a>


                        </div>


                    </div>
                </div>
                <div className="w-1/2 h-1/2  rounded-2xl font-Outfit bg-admin-primary shadow-lg hover:border-b-2 p-2 border-blue-600 ">

                    <div className="h-full w-full " >


                        <div className=" w-full h-2/5 flex  flex-col mt-2 items-center  " >

                            <p className="font-semibold" >TOTAL USERS</p>
                            <p className="text-4xl" >{allUsers}</p>
                        </div>
                        <div className=" w-full h-2/5 flex justify-between space-x-1 px-2">

                            <motion.div {...div1} {...style}>
                                <p>Completed</p>
                                <p className="text-2xl" >{completedUsers}</p>

                            </motion.div>
                            <motion.div {...div2}  {...style}>
                                <p>Allowed</p>
                                <p className="text-2xl" >{allowedUsers}</p>

                            </motion.div>
                            <motion.div {...div3} {...style}>
                                <p>pending</p>
                                <p className="text-2xl" >{pendingUsers}</p>

                            </motion.div>
                            <motion.div {...div4} {...style}>
                                <p>Rejected </p>
                                <p className="text-2xl" >{rejectedUsers}</p>

                            </motion.div>


                        </div>

                    </div>

                </div>





            </div>

        </div>
    )


}

export default VentureDetail