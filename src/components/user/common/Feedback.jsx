const Feedback=()=>{

    return(

        <div className="h-screen flex justify-center w-full" >
            <div className=" h-1/2  flex    w-2/3" >

             <div className=" border-r w-1/2 h-full flex justify-end items-center " >

                <div className=" h-1/2 flex flex-col mr-5 w-full" >
 
                 <textarea className="bg-gray-300 rounded-xl p-3 text-gray-600  " placeholder="Write you'r comments" ></textarea>
                 <div>
                    <button className="p-1 mt-2 rounded-3xl border w-4/12" >Post</button>
                 </div>
                </div>

             </div>
             <div className=" w-1/2 flex justify-end h-full">

                <img src="/venture-details-listing/venture-feedback.png"  className="h-4/5 "  alt="feedback_image" />
             </div>
               
            </div>
            
        </div>
    )
}
export default Feedback