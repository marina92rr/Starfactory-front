
import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    isLoadingClients: false,
    allClientsLoaded: false,
    clients: [],
    clientsLimit: [],
    totalPages: 1,
    activeClient: null,
    filter: '',
    filteredList: [],
    error: null,
    isLoadingLabelsClient: false,
    filteredLabelsByClient: {},
    clientsName: {}, // <- Añade este campo para el resultado de filtrar labels de un cliente
    activeClientLabels: [], // 👈 nuevo array Labels
    filteredClientsByLabel: [],
    scheduledCancellationClients: [], // 👈 nuevo array Programado


  },
  reducers: {

    //--------------Funciones cliente-----------------

    //Seleccion de cliente
    onSetActiveClient: (state, { payload }) => {
      state.activeClient = payload;
    },

    clearActiveClient: (state) => {
      state.activeClient = null;
      state.activeClientLabels = [];
    },

    onResetClientsPage: (state) => {
      state.activeClient = null;
      state.activeClientLabels = [];
      state.filter = '';
      state.filteredList = [];
      state.filteredClientsByLabel = [];
      state.clients = [];
      state.clientsLimit = [];
    },

    onResetFindLLabels: (state) => {
      state.filter = '';
      state.filteredList = [];
    },

    //Filtrar cliente
    onSetFilter: (state, action) => {
      state.filter = action.payload;

      const normalize = str => (str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

      const filter = normalize(state.filter);

      state.filteredList = state.clients.filter(client => {
        const fullName = normalize(`${client.name} ${client.lastName}`);
        const filterWords = filter.split(' ').filter(Boolean);
        return filterWords.every(word => fullName.includes(word));
      });
    },

    //Añadir cliente
    onAddNewClient: (state, { payload }) => {
      state.clients.push(payload);
      state.activeClient = null;
    },


    // Modificar cliente por ID
    onUpdateClient: (state, { payload }) => {
      state.clients = state.clients.map(client => {      //Nuevo array del evento
        if (client.idClient === payload.idClient) {
          return payload;
        }
        return client;
      })
    },
    //
    //eliminar cliente por ID
    onDeleteClient: (state) => {
      if (state.activeClient) {
        state.clients = state.clients.filter(client => client.idClient !== state.activeClient.idClient);
        state.activeClient = null;
      }
    },

    //Lectura clientes
    onLoadClients: (state, { payload = [] }) => {
      state.isLoadingClients = false,
        state.allClientsLoaded = true;
      state.clients = payload;
      payload.forEach(client => {
        const exists = state.clients.some(dbClient => dbClient.idClient === client.idClient);
        if (!exists) {
          state.clients.push(client)
        }
      })
    },

    //Lectura clientes
    onLoadLimitPageClients: (state, { payload = [] }) => {
      const { clients, totalPages } = payload;

      state.isLoadingClients = false;
      state.clientsLimit = clients;
      state.totalPages = totalPages;

      clients.forEach(client => {
        const exists = state.clients.some(dbClient => dbClient.idClient === client.idClient);
        if (!exists) {
          state.clients.push(client);
        }
      });
    },

    //Lectura Cliente
    onLoadClientByID: (state, { payload }) => {
      state.activeClient = payload;
      state.error = null;
    },
    
    onLoadClientsName: (state, {payload}) => {
        state.clientsName[payload.idClient] = payload;

    },



    //----------Etiquetas-----------------

    onLoadFilteredLabels: (state, action) => {
      const { idClient, labels } = action.payload;
      state.filteredLabelsByClient[idClient] = labels;
    },

    // Cargar etiquetas de cliente
    onLoadLabelsOfActiveClient: (state, action) => {
      state.activeClientLabels = action.payload; // array de labels completos
    },

    setFilteredClientsByLabel: (state, action) => {
      state.filteredClientsByLabel = action.payload;
    },
    clearFilteredClientsByLabel: (state) => {
      state.filteredClientsByLabel = [];
    },

    setActiveFilterLabels: (state, action) => {
      state.activeFilterLabels = action.payload;
    },

    //----------Bajas---------------
    // Cargar clientes con baja programada
    onLoadScheduledCancellations: (state, { payload }) => {
      state.scheduledCancellationClients = payload;
    },

    // Cancelar baja de cliente
    onToggleClientStatusCancel: (state, { payload }) => {
      state.clients = state.clients.map(client =>
        client.idClient === payload.idClient ? payload : client
      );
      if (state.activeClient?.idClient === payload.idClient) {
        state.activeClient = payload;
      }
    },

     onLogoutClients : (state) =>{
      state.isLoadingClients = true;
      state.clients= [];
      state.activeClient = null;
    }
  


  },




})
export const {
  //*Client
  onSetActiveClient,
  clearActiveClient,
  onResetClientsPage,
  onSetFilter,
  onFilterClient,
  onAddNewClient,
  onUpdateClient,
  onDeleteClient,
  onLoadClients,
  onLoadClientByID,
  onLoadLimitPageClients,
  onToggleClientStatusCancel,
  onLoadScheduledCancellations,
  onLoadClientsName,

  //*Labels
  onLoadLabelsOfActiveClient,
  onLoadFilteredLabels,
  setFilteredClientsByLabel,
  clearFilteredClientsByLabel,
  onResetFindLLabels,
  onLogoutClients

} = clientSlice.actions; //accion