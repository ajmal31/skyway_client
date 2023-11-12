

const Vlogin = () => {

    return (
        <form action="">
            <div className="bg-primary flex items-center flex-col   w-screen">

                <div className="b flex flex-col  p-10 items-center w-5/6">
                    <div className=" w-1/2 flex flex-col justify-center place-items-center h-1/6">
                        <label className="text-gray-300 font-bold font-Outfit text-4xl -tracking-widest ">Register Your Venture </label>


                    </div>
                    <div className="bg-secondory flex justify-center mt-5 rounded-2xl font-Outfit text-gray-300  items-center w-5/6">

                        <div className="w-5/6   ">
                            {/* name boxes */}
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">first Name
                                    <input type="text" className="p-1 bg-transparent border  outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Last Name
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            {/* Venute name */}
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Venture Name
                                <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                            </div>
                            {/* Phone numbers */}
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Phone number 1
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">phone number 2
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Official Email
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Venture Category
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Description About your Venture
                                <textarea className="p-1  bg-transparent border rounded" />
                            </div>

                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Expertise Country
                                <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                            </div>
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Minimum to Maximum Price of your service
                                <textarea className="p-1 bg-transparent border  rounded" />
                            </div>

                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Officail Portfolio Link
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">webiste Link
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>

                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Registration Number
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className="m-1 flex flex-col h-3/6 w-1/2">License Number
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            {/* social media account section */}
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">social Media Account Link
                                <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                            </div>
                            {/* uploads */}
                            <div className=" flex ">
                                <div className=" mr-1 flex flex-col h-3/6 w-1/2">upload your insurance
                                    <input type="file" className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className="  flex flex-col h-3/6 w-1/2">upload your License
                                    <input type="file" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            {/* Password section */}
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">first Password
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">confirm first Password
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">second Password
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">confirm second Password
                                    <input type="text" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            {/* check box */}
                            <div className=" m-1 flex justify-start items-start flex-col h-3/6 w-1/2">Agree term and conditions
                                <input type="checkbox" className="p-1 bg-gray-300 rounded" />
                            </div>


                        </div>


                    </div>

                </div>

            </div>
        </form>

    )

}

export default Vlogin