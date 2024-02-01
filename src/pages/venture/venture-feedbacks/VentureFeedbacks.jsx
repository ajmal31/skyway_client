import Sidebar from "../../../components/venture/sidebar/Sidebar.jsx"
import Feedback from "../../../components/venture/Feedbacks/Feedback"
const VentureFeedbacks=()=>{

    return(

        <div className="h-screen w-screen p-8 flex  gap-8 bg-primary"  >

         {/* <h1 className="text-white ">Dahsbord of the venture</h1> */}

         <div className="h-full w-2/12 shadow-2xl shadow-black">

            <Sidebar />
         </div>

         <div className="h-full w-10/12 rounded-2xl flex justify-center  shadow-2xl shadow-black p-8  bg-secondory">

             <Feedback/>

         </div>
      </div>
    )

}
export default VentureFeedbacks
