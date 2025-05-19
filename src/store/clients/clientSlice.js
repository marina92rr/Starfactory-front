
import { createSlice } from '@reduxjs/toolkit';

//const tempClient ={
//  name: 'Marina',
//  lastName: 'Ramos Ruiz',
//  dni: '45944278F',
//  email: 'marina92.rr@gmail.com',
//  mainPhone: '695090351',
//  optionalPhone: '567453209',
//  isTeacher: true
//}

export const clientSlice = createSlice({
  name: 'client',
  initialState:{
    isLoadingClients: true,
    clients: [
      //tempClient
    ],
    activeClient: null
  },
  reducers: {
    
    //--------------Funciones cliente-----------------
    //Seleccion de cliente
    onSetActiveClient :(state, {payload}) =>{
      state.activeClient = payload;
    },

    //Añadir cliente
    onAddNewClient : (state, {payload}) =>{
      state.clients.push(payload);
      state.activeClient = null;
    },


    // Modificar cliente
    onUpdateClient:(state, {payload})=>{
      state.clients = state.clients.map( client =>{
        if( client.id === payload.id){
          return payload;
        }
        return client;
      })
    },
//
    //eliminar cliente
    onDeleteClient : (state) =>{
      if(state.activeClient){
        state.clients = state.clients.filter( client => client.id !== state.activeClient.id);
        state.activeClient = null;
      }
    },

    //Lectura clientes
    onLoadClients : (state, {payload = []}) =>{
      state.isLoadingClients = false,

      state.clients = payload;

      payload.forEach( client =>{
        const exists = state.clients.some( dbClient => dbClient.id === client.id);
        if( !exists){
          state.clients.push(client)
        }
      })
    
    }
  },
})
export const {
  onSetActiveClient,
  onAddNewClient,
  onUpdateClient,
  onDeleteClient,
  onLoadClients

 } = clientSlice.actions; //accion