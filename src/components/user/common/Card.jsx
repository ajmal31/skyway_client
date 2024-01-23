import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
const Card = (prop) => {
    const { topVentures = [] } = prop
    const navigate=useNavigate()
    
    const handleTopVenture=(id)=>{
        navigate(`/ventureDetails/${id}`)
    }
    return (

        <div className="h-1/2" >

            {prop?.certificates ? (
                <div className="  w-full justify-center  font-Outfit text-white flex  ">



                    <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className="  flex-1 m-3 rounded-xl  h-48 flex justify-center items-center shadow-2xl shadow-black ">
                        <a href={prop.insurance} target="_blank" rel="noopener noreferrer"> <img src="/venture-documents-cover/venture-insurance.avif" className="h-48 w-[500px] rounded-xl" alt="Insurance" /></a>
                    </motion.div>
                    <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className=" flex-1 m-3 rounded-xl bg-secondory h-48 flex justify-center items-center shadow-2xl  shadow-black ">
                        <a href={prop.license} target="_blank" rel="noopener noreferrer" > <img src="/venture-documents-cover/venture-license-2.jpg" className="h-48 w-[500px] rounded-xl" /></a>
                    </motion.div>
                </div>
            ) : (
              
                <div className="  w-full h-[70px] justify-between font-Outfit  flex  border text-gray-400 border-gray-500  overflow-hidden " >
                    {topVentures?.map((val) => (
                       
                            <div onClick={e=>handleTopVenture(val._id)} className="border-r border-gray-500 w-4/12  flex justify-center items-center cursor-pointer " >
                               
                                <div className="w-5/6 h-3/6 overflow-hidden flex  text-ellipsis" >
                                    <p className="text-3xl overflow-hidden text-ellipsis" >{val.ventureName??val}</p>
                                </div>
                                                  


                            </div>
                       

                    ))}





                </div>
            )}


        </div>

    )

}

export default Card