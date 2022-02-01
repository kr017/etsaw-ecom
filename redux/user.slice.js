import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, addresses: [] },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        name: action.payload.Name,
        email: action.payload.email,
        id: action.payload.id,
        address: action.payload.address,
      };
    },
    removeUser: state => {
      state.user = null;
    },

    addAddress: (state, action) => {
      // const itemExists = state.addresses.find(item => item.id === action.payload.id);
      // if (itemExists) {
      //   itemExists;
      // } else {
      state.addresses.push({ ...action.payload });
      // }
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;
