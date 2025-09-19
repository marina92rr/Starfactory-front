

import { createSlice } from '@reduxjs/toolkit';

// USUARIOS
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',     //'authenticated' or 'not-authenticated'
    user: { name: null, uid: null, isAdmin: false },
    isLoadingUser: false,
    activeUser: null,
    users: [],
    registerUser: { name: null, uid: null, isAdmin: false },
    registerStatus: 'not-success',
    errorMessage: undefined
  },
  reducers: {

    //Estado de confirmacion de authenti
    onChecking: (state) => {
      state.status = 'Checking';
      state.errorMessage = undefined;
    },

    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = {
        name: payload.name,
        uid: payload.uid,
        isAdmin: !!payload.isAdmin, // <- fuerza booleano
      };
      state.errorMessage = undefined;
    },

    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = { name: null, uid: null, isAdmin: false };
      state.errorMessage = payload;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },


    onSetActiveUser: (status, { payload }) => {
      status.activeUser = payload;
    },

    onRegisterUser: (state, { payload }) => {
      state.registerUser = {
        name: payload.name,
        uid: payload.uid,
        isAdmin: !!payload.isAdmin,
      };
      state.registerStatus = 'success';
    },


    //Lectura clientes
    onLoadUsers: (state, { payload = [] }) => {
      state.isLoadingUser = false,

        state.users = payload;
      payload.forEach(user => {
        const exists = state.users.some(dbUser => dbUser.idUser === user.idUser);
        if (!exists) {
          state.users.push(user)
        }
      })
    },

    // Modificar usuario por ID
    onUpdateUser: (state, { payload }) => {
      state.users = state.users.map(user => {      //Nuevo array del usuario
        if (user.idUser === payload.idUser) {
          return payload;
        }
        return user;
      })
    },

    onDeleteUser: (state) => {
      if (state.activeUser) {
        state.users = state.users.filter(user => user.idUser !== state.activeUser.idUser);
        state.activeUser = null;
      }
    },

  },
})
export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  onSetActiveUser,
  onLoadUsers,
  onUpdateUser,
  onDeleteUser,
  onRegisterUser
} = authSlice.actions; //accion