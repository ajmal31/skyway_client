import { useState } from "react"

const VRegister = () => {


    const [cred, setCread] = useState({

        firstName: "",
        lastName: "",
        ventureName: "",
        phone_one: "",
        phone_two: "",
        official_email: "",
        venture_category: "",
        description:"",
        expertise_contries: "",
        min_max_service_amount: "",
        official_portfolio: "",
        webiste_link: "",
        registration_number: "",
        license_number: "",
        social_media: "",
        insurance_img: "",
        license_img: "",
        password_one: "",
        confirm_password_one: "",
        password_two: "",
        confirm_password_two: ""



    })
    const handleClick = (e) => {

        const { name, value } = e.target
    
        setCread((prev)=>({

            ...prev,[name]:value
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()

        console.log(cred)
    } 

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="bg-primary flex items-center flex-col   w-screen">

                <div className="b flex flex-col  p-10 items-center w-5/6">
                    <div className=" w-1/2 flex flex-col justify-center place-items-center h-1/6">
                        <label className="text-gray-300 font-bold font-Outfit text-4xl -tracking-widest ">Register Your Venture </label>


                    </div>
                    <div className="bg-secondory flex justify-center mt-5 rounded-2xl font-Outfit text-gray-300  items-center w-5/6">

                        <div className="w-5/6 mt-5  ">
                            {/* name boxes */}
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">first Name
                                    <input type="text" value={cred.firstName} name="firstName" onChange={handleClick} className="p-1 bg-transparent border   outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Last Name
                                    <input type="text" name="lastName" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            {/* Venute name */}
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Venture Name
                                <input type="text" name="ventureName" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                            </div>
                            {/* Phone numbers */}
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Phone number 1
                                    <input type="text" name="phone_one" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">phone number 2
                                    <input type="text" name="phone_two" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Official Email
                                    <input type="text" name="official_email" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Venture Category
                                    <input type="text"  name="venture_category" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Description About your Venture
                                <textarea name="description" onChange={handleClick} className="p-1    bg-transparent border rounded" />
                            </div>

                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Expertise Country
                                <input type="text" name="expertise_contries" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                            </div>
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Minimum to Maximum Price of your service
                                <textarea  name="min_max_service_amount" onChange={handleClick} className="p-1 bg-transparent border  rounded" />
                            </div>

                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Official Portfolio (link)
                                    <input type="text" name="official_portfolio" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">webiste Link
                                    <input type="text" name="webite_link" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>

                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Registration Number
                                    <input type="text" name="registration_number" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className="m-1 flex flex-col h-3/6 w-1/2">License Number
                                    <input type="text" name="license_number" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            {/* social media account section */}
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">social Media Account Link
                                <input type="text" name="social_media" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                            </div>
                            {/* uploads */}
                            <div className=" flex ">
                                <div className=" mr-1 flex flex-col h-3/6 w-1/2">upload your insurance
                                    <input type="file" onChange={handleClick} name="insurance_img" className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className="  flex flex-col h-3/6 w-1/2">upload your License
                                    <input type="file" onChange={handleClick} name="license_img" className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            {/* Password section */}
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">first Password
                                    <input type="text" name="password_one" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">confirm first Password
                                    <input type="text" name="confirm_password_one" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">second Password
                                    <input type="text" name="password_two" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">confirm second Password
                                    <input type="text" name="confirm_password_two" onChange={handleClick} className="p-1 bg-transparent border outline-none rounded" />
                                </div>

                            </div>
                            {/* check box */}
                            <div className=" m-1 flex justify-start items-start flex-col h-3/6 w-1/2">Agree term and conditions
                                <input type="checkbox"  className="p-1 bg-gray-300 rounded" />
                            </div>
                            <div>

                            </div>
                            <button type="submit">submit</button>

                        </div>


                    </div>

                </div>

            </div>
        </form>

    )

}

export default VRegister