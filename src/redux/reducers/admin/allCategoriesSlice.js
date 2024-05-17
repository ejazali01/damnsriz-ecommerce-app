import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  categories: null,
  singleCategory: null,
}

const recursivelyDeleteCategory = (categories, categoryIdToDelete) => {
  if (!Array.isArray(categories)) {
    console.error("Error: categories is not an array", categories);
    return categories; // Return the input as-is or handle the error
  }

  return categories
    .map(category => {
      if (category._id === categoryIdToDelete) {
        return null; // Mark for removal
      } else if (category.children && Array.isArray(category.children)) {
        const updatedChildren = recursivelyDeleteCategory(category.children, categoryIdToDelete);
        return {
          ...category,
          children: updatedChildren,
        };
      } else {
        return category;
      }
    })
    .filter(Boolean); // Remove null values
};

export const productCategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },

    setSingleCategory: (state, action) => {
      state.singleCategory = action.payload;
    },

    clearSingleCategoryState: (state) => {
      state.singleCategory = null;
    },

    removeCategory: (state, action) => {
  
      const categoryIdToDelete = action.payload;
      if (state.categories.data) {
        state.categories.data = recursivelyDeleteCategory(state.categories.data, categoryIdToDelete);

      } else {
        console.error("Error: state.categories is not an array", state.categories?.data);
      }

    }

  },
})



// Action creators are generated for each case reducer function
export const { setAllCategories, setSingleCategory, clearSingleCategoryState, removeCategory } = productCategorySlice.actions

export default productCategorySlice.reducer