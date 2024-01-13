import { useFormik } from "formik"
import basicSchema from "../schema/Schema"
import { useDispatch } from "react-redux"
import { fetchData } from "../../../redux/api/api"
import { VENTURE_SRV_BASE_URL } from "../../../data/const"
import { useme } from "../../../hooks/toast"
import { ToastContainer } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"


const VRegister = () => {

    const navigate = useNavigate()
    const disapatch = useDispatch()
    const { handleBlur, handleChange, values, errors, touched, handleSubmit } = useFormik({

        initialValues: {

            firstName: "",
            lastName: "",
            ventureName: "",
            phone_one: "",
            phone_two: "",
            official_email: "",
            venture_category: "",
            description: "",
            expertise_contries: "",
            industry_experience:"",
            min_max_service_amount: "",
            official_portfolio: "",
            website_link: "",
            register_number: "",
            license_number: "",
            social_media: "",
            insurance_file_link: "",
            license_file_link: "",
            password_one: "",
            confirm_password_one: "",
            password_two: "",
            confirm_password_two: ""
        },
        validationSchema: basicSchema,

        onSubmit: async (values) => {
            const error = 'error'
            const { password_one, confirm_password_one, password_two, confirm_password_two } = values
            if (password_one !== confirm_password_one) return useme('password one and confirm password is not matching', error)
            if (password_two !== confirm_password_two) return useme('password two and confirm password is not matching', error)
            const obj = {
                url: VENTURE_SRV_BASE_URL + 'register',
                method: 'post',
                data: values,
                token: false

            }

            const response = await disapatch(fetchData(obj))
            const { success } = response?.payload?.data
            if (success) {
                useme(success, "success")
                return navigate('/venture/login')

            }
            console.log('after geting response from ventur registeration', response)
            if (response?.payload?.data?.error) return useme(response?.payload?.data?.error, "error")

            const { msg } = response?.payload?.data?.errors[0]
            msg && useme(msg, error)



        }


    })

    return (


        <form onSubmit={handleSubmit}>
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
                                    <input
                                        type="text"

                                        name="firstName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.firstName}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.firstName && errors.firstName && (
                                        <div className="text-red-400">{errors.firstName}</div>
                                    )}

                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Last Name
                                    <input
                                        type="text"

                                        name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.lastName}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.lastName && errors.lastName && (
                                        <div className="text-red-400">{errors.lastName}</div>
                                    )}
                                </div>

                            </div>
                            {/* Venute name */}
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Venture Name
                                <input
                                    type="text"

                                    name="ventureName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    value={values?.ventureName}

                                    className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                {touched.ventureName && errors.ventureName && (
                                    <div className="text-red-400">{errors.ventureName}</div>
                                )}
                            </div>
                            {/* Phone numbers */}
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Phone number 1
                                    <input
                                        type="text"

                                        name="phone_one"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.phone_one}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.phone_one && errors.phone_one && (
                                        <div className="text-red-400">{errors.phone_one}</div>
                                    )}
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">phone number 2
                                    <input
                                        type="number"

                                        name="phone_two"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.phone_two}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.phone_two && errors.phone_two && (
                                        <div className="text-red-400">{errors.phone_two}</div>
                                    )}
                                </div>

                            </div>
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Official Email
                                    <input
                                        type="email"

                                        name="official_email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.official_email}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.official_email && errors.official_email && (
                                        <div className="text-red-400">{errors.official_email}</div>
                                    )}
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Venture Category
                                    <input
                                        type="text"

                                        name="venture_category"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.venture_category}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.venture_category && errors.venture_category && (
                                        <div className="text-red-400">{errors.venture_category}</div>
                                    )}
                                </div>
                                {/* text area hndling remaing  */}
                            </div>
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Description About your Venture
                                <textarea name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.description}
                                    className="p-1 bg-transparent border rounded" />
                                {touched.description && errors.description && (
                                    <div className="text-red-400">{errors.description}</div>
                                )}
                            </div>

                            {/* <div className=" m-1 flex flex-col h-3/6 w-2/2">Expertise Country
                                <input
                                    type="text"

                                    name="expertise_contries"
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    value={values?.expertise_contries}

                                    className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                {touched.expertise_contries && errors.expertise_contries && (
                                    <div className="text-red-400">{errors.expertise_contries}</div>
                                )}
                            </div> */}
                            <div className=" m-1 flex h-3/6  w-full">

                                <div className="flex flex-col w-2/3 m-1 ">
                                    <p> Expertise Country</p>
                                    <input
                                        type="text"
                                        placeholder="eg:- india , germany"
                                        name="expertise_contries"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.expertise_contries}

                                        className="p-1 bg-transparent border border-gray-600  outline-none rounded" />
                                    {touched.expertise_contries && errors.expertise_contries && (
                                        <div className="text-red-400">{errors.expertise_contries}</div>
                                    )}
                                </div>
                                <div className="flex flex-col w-1/3 m-1 ">
                                    <p>Industry Experience</p>
                                    <input
                                        type="number"
                                        placeholder="eg: 7"
                                        name="industry_experience"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.industry_experience}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.industry_experience && errors.industry_experience && (
                                        <div className="text-red-400">{errors.industry_experience}</div>
                                    )}
                                </div>

                            </div>
                            {/* text area found */}
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">Minimum to Maximum Price of your service (optional)
                                <textarea name="min_max_service_amount"
                                    value={values?.min_max_service_amount}
                                    onChange={handleChange} onBlur={handleBlur}
                                    className="p-1 bg-transparent border  rounded" />
                                {touched.min_max_service_amount && errors.min_max_service_amount && (
                                    <div className="text-red-400">{errors.min_max_service_amount}</div>
                                )}
                            </div>

                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Official Portfolio (link)
                                    <input
                                        type="text"

                                        name="official_portfolio"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.official_portfolio}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.official_portfolio && errors.official_portfolio && (
                                        <div className="text-red-400">{errors.official_portfolio}</div>
                                    )}
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">webiste Link
                                    <input
                                        type="text"

                                        name="website_link"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.website_link}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.website_link && errors.website_link && (
                                        <div className="text-red-400">{errors.website_link}</div>
                                    )}
                                </div>

                            </div>

                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">Registration Number
                                    <input
                                        type="number"

                                        name="register_number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.register_number}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.register_number && errors.register_number && (
                                        <div className="text-red-400">{errors.register_number}</div>
                                    )}
                                </div>
                                <div className="m-1 flex flex-col h-3/6 w-1/2">License Number
                                    <input
                                        type="number"

                                        name="license_number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.license_number}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.license_number && errors.license_number && (
                                        <div className="text-red-400">{errors.license_number}</div>
                                    )}
                                </div>

                            </div>
                            {/* social media account section */}
                            <div className=" m-1 flex flex-col h-3/6 w-2/2">social Media Account Link
                                <input
                                    type="text"

                                    name="social_media"
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    value={values?.social_media}

                                    className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                {touched.social_media && errors.social_media && (
                                    <div className="text-red-400">{errors.social_media}</div>
                                )}
                            </div>
                            {/* uploads */}
                            <div className=" flex ">
                                <div className=" mr-1 flex flex-col h-3/6 w-1/2">Insurance file Link (make sure is it accessible)
                                    <input
                                        type="text"

                                        name="insurance_file_link"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.insurance_file_link}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.insurance_file_link && errors.insurance_file_link && (
                                        <div className="text-red-400">{errors.insurance_file_link}</div>
                                    )}
                                </div>
                                <div className="  flex flex-col h-3/6 w-1/2">License File Link (make sure is it accessible)
                                    <input
                                        type="text"

                                        name="license_file_link"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.license_file_link}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.license_file_link && errors.license_file_link && (
                                        <div className="text-red-400">{errors.license_file_link}</div>
                                    )}
                                </div>

                            </div>
                            {/* Password section */}
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">first Password
                                    <input
                                        type="password"

                                        name="password_one"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.password_one}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.password_one && errors.password_one && (
                                        <div className="text-red-400">{errors.password_one}</div>
                                    )}
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">confirm first Password
                                    <input
                                        type="password"

                                        name="confirm_password_one"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.confirm_password_one}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.confirm_password_one && errors.confirm_password_one && (
                                        <div className="text-red-400">{errors.confirm_password_one}</div>
                                    )}
                                </div>

                            </div>
                            <div className=" flex">
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">second Password
                                    <input
                                        type="password"

                                        name="password_two"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.password_two}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.password_two && errors.password_two && (
                                        <div className="text-red-400">{errors.password_two}</div>
                                    )}
                                </div>
                                <div className=" m-1 flex flex-col h-3/6 w-1/2">confirm second Password
                                    <input
                                        type="password"

                                        name="confirm_password_two"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values?.confirm_password_two}

                                        className="p-1 bg-transparent border border-gray-600 outline-none rounded" />
                                    {touched.confirm_password_two && errors.confirm_password_two && (
                                        <div className="text-red-400">{errors.confirm_password_two}</div>
                                    )}
                                </div>

                            </div>
                            {/* check box */}
                            <div className=" m-1 flex justify-start mb-4 items-start  h-3/6 w-1/2">
                                <input type="checkbox" className=" m-1 bg-gray-300 rounded" />
                                <p>Agree term and conditions</p>
                            </div>

                            <div className="h-3/6 w-1/2 mb-2 flex justify-start ">
                                <button className="bg-sec-button p-2 px-10 rounded-xl" type="submit">submit</button>

                            </div>

                            <div className="h-3/6 w-1/2 flex justify-start ">

                                <Link to={'/venture/login'} >Already Have an Account</Link>
                            </div>
                            <br />

                        </div>



                    </div>


                </div>

            </div>
            <ToastContainer />
        </form>


    )

}

export default VRegister