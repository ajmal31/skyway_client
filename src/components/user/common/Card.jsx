import {motion} from "framer-motion"
const Card=(prop)=>{

    return(

        <div >

            {prop?.certificates ?(
                <div className="  w-full justify-center  font-Outfit text-white flex  ">

                    
                
                <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className="  flex-1 m-3 rounded-xl  h-48 flex justify-center items-center shadow-2xl shadow-black ">
                <a href={prop.insurance} target="_blank" rel="noopener noreferrer"> <img src="/venture-documents-cover/venture-insurance.avif" className="h-48 w-[500px] rounded-xl" alt="Insurance" /></a>
                </motion.div>
                <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className=" flex-1 m-3 rounded-xl bg-secondory h-48 flex justify-center items-center shadow-2xl  shadow-black ">
                   <a href={prop.license} target="_blank" rel="noopener noreferrer" > <img src="/venture-documents-cover/venture-license-2.jpg" className="h-48 w-[500px] rounded-xl" /></a>
                </motion.div>
                </div>
            ):(
                <div className="  w-full justify-center  font-Outfit text-white flex  " >
                <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className="  flex-1 m-3 rounded-xl bg-secondory h-48 flex justify-center items-center shadow-2xl shadow-black ">helo1</motion.div>
                <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className=" flex-1 m-3 rounded-xl bg-secondory h-48 flex justify-center items-center shadow-2xl shadow-black ">helo1</motion.div>
                <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className=" flex-1 m-3 rounded-xl bg-secondory h-48 flex justify-center items-center shadow-2xl shadow-black ">helo1</motion.div>
                <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className=" flex-1 m-3 rounded-xl bg-secondory h-48 flex justify-center items-center shadow-2xl shadow-black ">helo1</motion.div>
                </div>
            )}
       

      </div>

    )

}

export default Card