import { createSlice, nanoid } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";


const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  currentUser: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUserdetails: (state, action) => {
      const { role } = action.payload;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.isAdmin = role === 'admin';
    },

    signoutSucess: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null
      localStorage.clear();
    }

  },

  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      // Reset state to initial state when purged
      Object.assign(state, initialState);
    });
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentUserdetails, signoutSucess } = userSlice.actions

export default userSlice.reducer