import Banner from "./Banner";
import Navbar from "./Navbar";
import {motion} from 'framer-motion'

const Background = () => {
  return (
    <div className="bg-primary h-screen w-screen">
      <Navbar />

      <div className="flex h-full bg-primary p-10">
        <div className="w-1/2 mb-16 p-4">
          <div className="bg-primary h-full flex items-start pt-3 pl-3 justify-start">
            <div className="flex flex-col">
              <div className="text-gray-300 font-bold leading-tight font-Outfit tracking-wider text-4xl">
                Discover Opportunities to Transform Your Career and Achieve Success
              </div>
              {/* <p className="text-white font-Outfit  text-sm mt-3">Your Journey Begins Here ✈</p> */}
              <p className="text-gray-300 font-Outfit  text-base mt-3">Empowering dreams and connecting individuals <br />with trusted visa ✈</p>
              <div className="mt-3">
                <button className="text-gray-300 font-Outfit border-transparent shadow-2xl shadow-purple-950  hover:bg-transparent hover:border-white  hover:border-y   mr-5 rounded-3xl bg-sec-button px-6 pr-16 py-2.5  ">More&nbsp;</button>
                <button className="text-gray-300 font-Outfit  shadow-2xl shadow-purple-950 hover:border-transparent   hover:bg-sec-button rounded-3xl border px-6 pr-14 py-2.5  ">About us</button>
              </div>
              
            </div>


          </div>
        </div>


        <div className="w-1/2 p-4 mb-16 mr-10 flex items-start  justify-start ">
          <div className="bg-primary   h-full ">
            <motion.img 
          
            // animate={{rotate:360}}
          
            //             transition={{
            //                 duration: 3,
            //                 repeat: Infinity,
            //                 repeatType: 'reverse'
            //             }}
              src="/home-bg-removed.png" alt="Your Image" className="w-6/7 mr-16 max-h-full object-contain" />
          </div>

        </div>        
      </div>
    
    </div>
  );
}

export default Background;
