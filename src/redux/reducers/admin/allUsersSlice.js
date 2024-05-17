import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  allUsers:null,
  getData : null,
}

export const allUsersSlice = createSlice({
  name: "all Users",
  initialState,
  reducers: {
    setAllUsersdetails: (state, action) => {
      state.allUsers = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setAllUsersdetails } = allUsersSlice.actions

export default allUsersSlice.reducer