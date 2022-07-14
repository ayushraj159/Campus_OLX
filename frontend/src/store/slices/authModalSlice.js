import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    openModal: false,
    openLogin: false,
    openRegister: false,
};

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState: initialState,
    reducers: {
        open_login: (state, action) => {
            state.openModal = true;
            state.openLogin = true;
            state.openRegister = false;
      },
        open_register: (state, action) => {
            state.openModal = true;
            state.openLogin = false;
            state.openRegister = true;
      },
        closeAll: (state, action) => {
            state.openModal = false;
            state.openLogin = false;
            state.openRegister = false;
      },
    },
  })
  
export const {open_login, open_register, closeAll} = authModalSlice.actions

export default authModalSlice.reducer