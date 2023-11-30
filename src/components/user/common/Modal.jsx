import { USER_SRV_BASE_URL } from "../../../data/const"
const Modal = ({ visible, onClose, connectUser, id }) => {

    if (!visible) return null

    //this function will be close the modal
    const handleOnClose = () => onClose()

    //this function handling Connecting user Request
    const handleRequest = () => connectUser(id)

    return (

        <div className="h-full w-full backdrop-blur-sm backdrop-brightness-50 top-0 left-0 flex justify-center items-center z-50 fixed  "  onClick={handleOnClose} >
            <div className="bg-secondory h-1/3  rounded-3xl   w-1/6 " onClick={e=>e.stopPropagation()} >

                {/* <div className="h-1/3 flex items-start  justify-end  ">
                    <button className="m-2">✖</button>
                </div> */}

                <div className="justify-center items-center  flex w-full h-full ">
                    <button className="border p-3 rounded-3xl hover:bg-button " onClick={handleRequest} >📞Request for a Call</button>
                </div>

            </div>
        </div>
    )


}

export default Modal