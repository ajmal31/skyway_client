import About from "../ventureDetails/About"
import Card from "./Card"
import Graph from "./Graph"
import Feedback from "./Feedback"
const BgBox=()=>{

  return (

    <div className="bg-gray-500 h-full w-full mt-10 rounded-3xl " >
        <p className="text-4xl font-Outfit">About us</p>
        <About/>
        <p className="text-4xl my-8 text-center font-Outfit">Our Main Destinations</p>
        <Card/> 
        <p className="text-4xl text-center my-8 font-Outfit">Our Trusts</p>
        <Card certificates={true} />
        <p className="text-4xl text-center my-8 font-Outfit">Customer Feedback About the Abc Company</p>
        <Graph/>
        <p className="text-4xl text-center my-8 font-Outfit">Point Out Your Valuable Words About us</p>
        <Feedback/>
        
    </div>
  )


}
export default BgBox