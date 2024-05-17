import axios from "axios"

// login user 
const updateUserRole = async (formData) => {
    const user = await axios.put('/users/update-user-role', formData, { withCredentials: true })
    return user
}

export {
    updateUserRole
}