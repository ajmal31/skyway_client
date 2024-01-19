import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
import StarRating from "react-stars"
import { useme } from "../../../hooks/toast"
const Feedback = ({ comment_url, commentUpdated, data = {}, roll = "platform" }) => {

    const dispatch = useDispatch()
    const [comment, setComment] = useState()
    const [rating, setRating] = useState(0);
    const [handleRating, setHandleRating] = useState(false)
    const [handleComment, setHandleComment] = useState(false)

    const apiDetails = {
        method: 'post',
        url: comment_url,
        data: data,
        token: true,
        to: "user"
    }
    const handlePost = async () => {
       
        if (comment?.length===0)setHandleComment(true)
        else if( rating <= 0 && roll === "venture") setHandleRating(true)
        else {
            roll === "venture" ? data.rating = rating : null
            data.content = comment
            console.log(apiDetails)
            const response = await dispatch(fetchData(apiDetails))
            setComment('')
            setRating(0)
            return commentUpdated()

        }


    }


    const handleRatingChange = (newRating) => {

        console.log('new rating', newRating)
        setRating(newRating);
    };



    return (

        <div className=" flex justify-center text-gray-300  items-center mb-14 w-full" >

            <div className=" h-1/2  flex  justify-center items-center   w-2/3" >


                <div className="  w-1/2 h-full flex justify-end  items-center " >

                    <div className=" h-1/2 flex flex-col mr-5 w-full" >
                        {handleRating && <p className="text-red-500" >Please give rating</p>}
                        {handleComment && <p className="text-red-500" >Please add your words</p>}
                        <textarea className="bg-gray-300 rounded-xl p-3 text-gray-600  " placeholder="Write you'r comments" value={comment} onChange={(e) => setComment(e.target.value)} ></textarea>

                        {roll === "venture" ? <StarRating count={5} onChange={handleRatingChange} size={30}  value={rating} /> : null}
                        <div>
                            <button className="p-1 mt-2 rounded-3xl border w-4/12" onClick={handlePost} >Post</button>
                        </div>
                    </div>

                </div>

                <div className=" w-1/2 flex justify-end border-l h-full">

                    <img src="/venture-details-listing/venture-feedback.png" className="h-4/5 " alt="feedback_image" />
                </div>


            </div>

        </div >
    )
}
export default Feedback