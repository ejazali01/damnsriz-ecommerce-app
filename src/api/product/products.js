import axios from "axios";

// const BASE_BRL = "http://localhost:8080/api/v1"
const config = {headers : {'Content-Type': 'multipart/form-data'}};

const createProduct = async (formData) => {
    const response = await axios.post("/products/create", formData,config ,{ withCredentials: true });
    return response.data;
}


const getAllProducts = async () => {
    const response = await axios.get(`/products`);
    return response.data;
}

const getSingleProduct = async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
}

export {
    getAllProducts,
    getSingleProduct,
    createProduct
}