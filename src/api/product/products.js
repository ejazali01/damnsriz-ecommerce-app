import axios from "axios";

const getAllProducts = async() => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
}

const getSingleProduct = async (productId) => {
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
    console.log(response)
    return response.data;
}

export {
    getAllProducts,
    getSingleProduct
}