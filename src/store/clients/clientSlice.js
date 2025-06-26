
import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
  name: 'client',
  initialState:{
    isLoadingClients: false,
    allClientsLoaded: false,
    clients: [],
    clientsLimit: [],
    activeClient: null,
    filter: '',
    filteredList: [],
    error: null,
    isLoadingLabelsClient: false
  },
  reducers: {
    
    //--------------Funciones cliente-----------------

    //Seleccion de cliente
    onSetActiveClient :(state, {payload}) =>{
      state.activeClient = payload;
    },

    //Filtrar cliente
    onSetFilter: (state, action) => {
      state.filter = action.payload;
      const filter = state.filter.trim().toLowerCase();
      state.filteredList = state.clients.filter(dbclient => {const full = `${dbclient.name} ${dbclient.lastname}`.toLowerCase();
        return full.includes(filter);
      });
    },

    //Añadir cliente
    onAddNewClient: (state, action) => {
      state.clients.push(action.payload);
      state.activeClient = null;
    },


    // Modificar cliente por ID
    onUpdateClient:(state, {payload})=>{
      state.clients = state.clients.map( client =>{      //Nuevo array del evento
        if( client.idClient === payload.idClient){
          return payload;
        }
        return client;
      })   
    },
//
    //eliminar cliente por ID
    onDeleteClient : (state) =>{
      if(state.activeClient){
        state.clients = state.clients.filter( client => client.idClient !== state.activeClient.idClient);
        state.activeClient = null;
      }
    },

    //Lectura clientes
    onLoadClients : (state, {payload = []}) =>{
      state.isLoadingClients = false,
      state.allClientsLoaded = true;
      state.clients = payload;
      payload.forEach( client =>{
        const exists = state.clients.some( dbClient => dbClient.idClient === client.idClient);
        if( !exists){
          state.clients.push(client)
        }
      })
    },

        //Lectura clientes
    onLoadLimitClients : (state, {payload = []}) =>{
      state.isLoadingClients = false,
      state.clientsLimit = payload;
      payload.forEach( client =>{
        const exists = state.clients.some( dbClient => dbClient.idClient === client.idClient);
        if( !exists){
          state.clients.push(client)
        }
      })
    },

    //Lectura Cliente
    onLoadClientByID : (state, {payload}) =>{
      state.activeClient = payload;
      state.error = null;
    }
  },


})
export const {
  //*Client
  onSetActiveClient,
  onSetFilter,
  onFilterClient,
  onAddNewClient,
  onUpdateClient,
  onDeleteClient,
  onLoadClients,
  onLoadClientByID,
  onLoadLimitClients

} = clientSlice.actions; //accion