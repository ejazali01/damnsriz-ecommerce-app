import axios from "axios";

// login user 
const userLogin = async(formData) => {
    const user = await axios.post('http://localhost:8080/api/v1/users/admin-login', formData)
    return user
}

// register user 
const registerUser = async(formData) => {
    const user = await axios.post('http://localhost:8080/api/v1/users/register', formData)
    return user
}

export {
    userLogin,
    registerUser,
}