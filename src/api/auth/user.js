import axios from "axios";
// https://damnsruz-backend-1.onrender.com
const BASE_URL = "https://damnsruz-backend-1.onrender.com/api/v1"
axios.defaults.baseURL = BASE_URL

// login user 
const userLogin = async (formData) => {
    const user = await axios.post('/users/login', formData, { withCredentials: true })
    return user
}

// get authenticated user data  
const getUser = async () => {
    const response = await axios.get("/users/user", { withCredentials: true })
    return response.data;
}

// get All Users 
const getAllUsers = async () => {
    const response = await axios.get("/users/", { withCredentials: true })
    return response.data;
}

// register user 
const registerUser = async (formData) => {
    const user = await axios.post('/users/register', formData)
    return user
}

const forgetPasswordOtp = async (formData) => {
    const user = await axios.post('/users/password-assistance', formData)
    return user
}

const verifyOtp = async (formData) => {
    const user = await axios.post('/users/verify-otp', formData)
    return user
}

const resetPassword = async (formData) => {
    const user = await axios.post('/users/reset-password/:token', formData)
    return user
}

//logout user
const logoutUser = async () => {
    try {
        const response = await axios.post("/users/logout",  {},{ withCredentials: true })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}


export {
    userLogin,
    registerUser,
    forgetPasswordOtp,
    verifyOtp,
    resetPassword,
    getUser,
    logoutUser,
    getAllUsers
}