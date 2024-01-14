import * as yup from "yup"


const basicSchema = yup.object().shape({


    firstName: yup
        .string('must be a string')
        .trim()
        .matches(/^[a-zA-Z]+$/, "only alphabets are Allowed")
        .required('First Name is required'),
    lastName: yup
        .string('must be a string')
        .trim()
        .matches(/^[a-zA-Z]+$/, "only alphabets are Allowed")
        .required('last name is required'),
    ventureName: yup
        .string('name must be string')
        .matches(/^[a-zA-Z ]+$/, "only alphabets are Allowed")
        .required('venture name is required'),
    phone_one: yup
        .number()
        .typeError('name must be a number')
        .required('phone number is required')
        .positive('please enter a valid number'),
    phone_two: yup.
        number()
        .typeError('name must be a number')
        .required('phone number required')
        .positive('please enter a valid number'),
    official_email: yup
        .string()
        .trim()
        .lowercase()
        .required('email is required')
        .email('enter a valid email'),
    venture_category: yup
        .string('name must be string')
        .trim()
        .matches(/^[a-zA-Z ,.]+$/, "only alphabets are Allowed")
        .required('venture category is required'),
    description: yup
        .string('name must be string')
        // .matches(/^[a-zA-Z]+$/, "only alphabets are Allowed")
        .required('description is required')
        .min(1350).max(1430),
    expertise_contries: yup
        .string('name must be string')
        .trim()
        .matches(/^[a-zA-Z ,]+$/, "avoid un necessary expressions")
        .required('contry is  is required'),
    industry_experience: yup
        .number()
        .required("Required field"),
    min_max_service_amount: yup
        .string()
        .trim(),
    official_portfolio: yup
        .string()
        .trim()
        .lowercase()
        .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([\/\w.-]*)*\/?$/, 'Invalid link format')
        .required('official portfolio is required'),
    website_link: yup
        .string().required('website reference is required')
        .lowercase()
        .trim()
        .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([\/\w.-]*)*\/?$/, 'Invalid link format'),
    register_number: yup
        .string()
        .trim()
        .matches(/^[A-Za-z0-9]{5,10}$/, 'Invalid register number format')
        .required('register number required'),
    license_number: yup
        .string()
        .trim()
        .matches(/^[A-Za-z0-9]{5,10}$/, 'Invalid license number format')
        .required('license number is required '),
    social_media: yup
        .string()
        .trim()
        .lowercase()
        .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([\/\w.-]*)*\/?$/, 'Invalid link format')
        .required('social media refrence  is required '),
    insurance_file_link: yup
        .string()
        .trim()
        .lowercase()
        .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([\/\w.-]*)*\/?$/, 'Invalid link format')
        .required('insurance file link is required '),
    license_file_link: yup
        .string()
        .trim()
        .lowercase()
        .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([\/\w.-]*)*\/?$/, 'Invalid link format')
        .required('license file  link is required '),
    password_one: yup
        // .trim() // Trim whitespace
        // .min(8, 'Password must be at least 8 characters') // Minimum length
        // .max(32, 'Password must not exceed 32 characters') // Maximum length
        // .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Require lowercase letters
        // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Require uppercase letters
        // .matches(/[0-9]/, 'Password must contain at least one number') // Require numbers
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character') // Require special characters
        // .required('Password is required')
        .string()
        .required('password one  is required ')
        .min(5).max(20),
    confirm_password_one: yup
        // .trim() // Trim whitespace
        // .min(8, 'Password must be at least 8 characters') // Minimum length
        // .max(32, 'Password must not exceed 32 characters') // Maximum length
        // .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Require lowercase letters
        // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Require uppercase letters
        // .matches(/[0-9]/, 'Password must contain at least one number') // Require numbers
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character') // Require special characters
        // .required('Password is required')
        .string()
        .required('confirm password one  is required ')
        .min(5).max(20),
    password_two: yup
        // .trim() // Trim whitespace
        // .min(8, 'Password must be at least 8 characters') // Minimum length
        // .max(32, 'Password must not exceed 32 characters') // Maximum length
        // .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Require lowercase letters
        // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Require uppercase letters
        // .matches(/[0-9]/, 'Password must contain at least one number') // Require numbers
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character') // Require special characters
        // .required('Password is required')
        .string()
        .required('confirm password two  is required ')
        .min(5).max(20),
    confirm_password_two: yup
        // .trim() // Trim whitespace
        // .min(8, 'Password must be at least 8 characters') // Minimum length
        // .max(32, 'Password must not exceed 32 characters') // Maximum length
        // .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Require lowercase letters
        // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Require uppercase letters
        // .matches(/[0-9]/, 'Password must contain at least one number') // Require numbers
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character') // Require special characters
        // .required('Password is required')
        .string()
        .required('confirm password two  is required ')
        .min(5).max(20),









})


export default basicSchema
