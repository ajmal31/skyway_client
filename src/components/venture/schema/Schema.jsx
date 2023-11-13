import * as yup from "yup"

const basicSchema=yup.object().shape({

    firstName: yup.string().required('First Name is required'),
    lastName:yup.string('name must be string').required('last name is required'),
    ventureName:yup.string('name must be string').required('venture name is required'),
    phone_one:yup.number('name must be number').required('phone numberis required'),
    phone_two:yup.string('name must be string').required('phone number required'),
    official_email:yup.string('name must be string').required('email is required'),
    venture_category:yup.string('name must be string').required('venture category is required'),
    description:yup.string('name must be string').required('description is required'),
    expertise_contries:yup.string('name must be string').required('contry is  is required'),
    min_max_service_amount:yup.string().required('required field'),
    official_portfolio: yup.string().required('official port folio rrequired'),
    website_link: yup.string().required('website reference is required'),
    register_number: yup.string().required('register number required'),
    license_number: yup.string().required('license number is required '),
    social_media: yup.string().required('social media refrence  is required '),
    insurance_img: yup.string().required('insurance file is required '),
    license_img: yup.string().required('license file is required '),
    password_one: yup.string().required('password one  is required '),
    confirm_password_one: yup.string().required('confirm password one  is required '),
    password_two: yup.string().required('confirm password two  is required '),
    confirm_password_two: yup.string().required('confirm password two  is required '),
    

    
    
    
    
      
   
})


export default basicSchema
