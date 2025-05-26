
import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
  name: 'client',
  initialState:{
    isLoadingClients: false,
    clients: [],
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
      const q = state.filter.trim().toLowerCase();
      state.filteredList = state.clients.filter(c => {
        const full = `${c.name} ${c.lastname}`.toLowerCase();
        return full.includes(q);
      });
    },

    //Añadir cliente
    onAddNewClient: (state, action) => {
      state.clients.push(action.payload);
      state.activeClient = null;
    },


    // Modificar cliente por dni
    onUpdateClient:(state, {payload})=>{
      const update = payload;
      state.clients = state.clients.map( client => client.dni === update.dni ? update : client);  //Si el id existe entonces update sino nuevo client
    },
//
    //eliminar cliente por dni
    onDeleteClient : (state) =>{
      if(state.activeClient){
        state.clients = state.clients.filter( client => client.dni !== state.activeClient.dni);
        state.activeClient = null;
      }
    },

    //Lectura clientes
    onLoadClients : (state, {payload = []}) =>{
      state.isLoadingClients = false,

      state.clients = payload;

      payload.forEach( client =>{
        const exists = state.clients.some( dbClient => dbClient.dni === client.dni);
        if( !exists){
          state.clients.push(client)
        }
      })
    },


    //Lectura Cliente
    onLoadClientByDNI : (state, {payload}) =>{
      state.activeClient = payload;
      state.error = null;
    }
   
  },

  setError: (state, action) => {
    state.error = action.payload;
  },

  //LABELS
  onSetActiveLabel :(state) =>{
    state.isLoadingLabelsClient = true;
  },

  onLoadingLabelsClient: (state, {payload: {dni, labels}}) =>{
    state.isLoadingLabelsClient = false;

    const client = state.clients.find(c => c.dni === dni)
      if (client) {
        client.labels = labels
      }

  }
  


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
  onLoadClientByDNI,
  setError,
  //*Labels
 onSetActiveLabel,
 onLoadingLabelsClient
  

 } = clientSlice.actions; //accion