import axios from "axios";

// const BASE_BRL = "http://localhost:8080/api/v1"
const config = { headers: { 'Content-Type': 'multipart/form-data' } };

const createProductCategory = async (formData) => {
    const response = await axios.post("/product-categories/create", formData, config, { withCredentials: true });
    return response.data;
}


const getAllProductCategories = async () => {
    const response = await axios.get(`/product-categories/`);
    return response.data;
}

const getSingleCategory = async (categoryId) => {
    const response = await axios.get(`/product-categories/${categoryId}`, { withCredentials: true });
    return response.data;
}

// update category
const updateCategory = async (formData, categoryId) => {
    const response = await axios.put(`/product-categories/update/${categoryId}`, formData, config, { withCredentials: true });
    return response.data;
}

const deleteCategory = async (categoryId) => {
    const response = await axios.delete(`/product-categories/delete/${categoryId}`, { withCredentials: true });
    return response.data;
}

export {
    getAllProductCategories,
    getSingleCategory,
    createProductCategory,
    updateCategory,
    deleteCategory
}