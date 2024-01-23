const PendingVenture = () => {

    return (


        <div className="font-Outfit text-gray-400  flex justify-center items-center" >
            <div className="w-[500px] h-[350px] bg-secondory flex justify-center items-center rounded-2xl " >
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <h1>Thank's For you're Patience {localStorage.getItem("ventureName")}</h1>
                    <div className=" w-4/6 flex mt-8 ml-10   items-start h-2/6">
                        <h1>Your  Registration process is going on..be patient pleasse wait for the confirmation</h1>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default PendingVenture