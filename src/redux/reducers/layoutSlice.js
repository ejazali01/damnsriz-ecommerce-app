import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    open : false,
}

export const LayoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        drawerOpen: (state) => {
            state.open = true;
        },

        drawerClose: (state) => {
            state.open = false;
        },

    },
})

// Action creators are generated for each case reducer function
export const { drawerOpen, drawerClose } = LayoutSlice.actions

export default LayoutSlice.reducer