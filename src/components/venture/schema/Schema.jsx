import * as yup from "yup"

const basicSchema=yup.object().shape({
  
    
    firstName: yup.
    string('must be a string')
    .required('First Name is required'),
    lastName:yup
    .string('name must be string')
    .required('last name is required'),
    ventureName:yup
    .string('name must be string')
    .required('venture name is required'),
    phone_one:yup
    .number('name must be a number')
    .required('phone number is required')
    .positive('please enter a valid number'),
    phone_two:yup.
    number('name must bea number')
    .required('phone number required')
    .positive('please enter a valid number'),
    official_email:yup
    .string('name must be string')
    .required('email is required')
    .email('enter a valid email'),
    venture_category:yup
    .string('name must be string')
    .required('venture category is required'),
    description:yup
    .string('name must be string')
    .required('description is required')
    .min(1350).max(1430),
    expertise_contries:yup
    .string('name must be string')
    .required('contry is  is required'),
    min_max_service_amount:yup
    .string(),
    official_portfolio: yup
    .string()
    .required('official portfolio is required'),
    website_link: yup
    .string().required('website reference is required'),
    register_number: yup
    .string().required('register number required'),
    license_number: yup
    .string().required('license number is required '),
    social_media: yup
    .string().required('social media refrence  is required '),
    insurance_img: yup
    .mixed().required('insurance file is required '),
    license_img: yup
    .mixed().required('license file is required '),
    password_one: yup
    .string().required('password one  is required ')
    .min(5).max(20),
    confirm_password_one: yup
    .string().required('confirm password one  is required ')
    .min(5).max(20),
    password_two: yup
    .string().required('confirm password two  is required ')
    .min(5).max(20),
    confirm_password_two: yup
    .string().required('confirm password two  is required ')
    .min(5).max(20),
     
    

    
    
    
    
      
   
})


export default basicSchema
