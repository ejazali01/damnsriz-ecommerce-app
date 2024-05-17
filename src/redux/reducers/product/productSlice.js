import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    products: null,
}

export const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.products = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const { setAllProducts } = ProductSlice.actions

export default ProductSlice.reducer