import {motion} from "framer-motion"
const Card=(prop)=>{

    console.log('card prop',prop)

    return(

        <div >

            {prop?.certificates ?(
                <div className="  w-full justify-center  font-Outfit text-white flex  ">

                    
                
                <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className="  flex-1 m-3 rounded-xl bg-secondory h-48 flex justify-center items-center shadow-2xl shadow-black ">helo1</motion.div>
                <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className=" flex-1 m-3 rounded-xl bg-secondory h-48 flex justify-center items-center shadow-2xl shadow-black ">helo1</motion.div>
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