import axios from "axios";

// login user 
const userLogin = async(formData) => {
    const user = await axios.post('http://localhost:8080/api/v1/users/login', formData)
    return user
}

// register user 
const registerUser = async(formData) => {
    const user = await axios.post('http://localhost:8080/api/v1/users/register', formData)
    return user
}

const forgetPasswordOtp = async(formData) => {
    const user = await axios.post('http://localhost:8080/api/v1/users/password-assistance', formData)
    return user
}

const verifyOtp = async(formData) => {
    const user = await axios.post('http://localhost:8080/api/v1/users/verify-otp', formData)
    return user
}

const resetPassword = async(formData) => {
    const user = await axios.post('http://localhost:8080/api/v1/users//reset-password/:token', formData)
    return user
}

export {
    userLogin,
    registerUser,
    forgetPasswordOtp,
    verifyOtp,
    resetPassword,
}