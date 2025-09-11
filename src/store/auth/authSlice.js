

import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    status: 'checking',     //'authenticated' or 'not-authenticated'
    user: {},
    errorMessage: undefined
  },
  reducers: {
    
    //Estado de confirmacion de authenti
    onChecking: (state) => {
        state.status = 'Checking';
        state.user = {};
        state.errorMessage = undefined;
    },

    onLogin: ( state, {payload}) =>{
        state.status = 'authenticated';
        state.user = payload;
        state.errorMessage = undefined;
    },

    onLogout: (state, {payload}) => {
      state.status = 'not-authenticated';
        state.user = {};
        state.errorMessage = payload;
    },

    clearErrorMessage: (state) =>{
      state.errorMessage = undefined;
    }
  },
})
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions; //accion