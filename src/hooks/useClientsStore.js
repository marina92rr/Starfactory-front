import { useDispatch, useSelector } from "react-redux"
import {
  onAddNewClient,
  onLoadClientByID,
  onLoadClients,
  onLoadLimitClients,
  onSetActiveClient,
  onSetFilter,
  onUpdateClient,
} from "../store/clients/clientSlice";

import { clientsApi } from "../api";
import { useParams } from "react-router-dom";



export const useClientsStore = () => {

  const dispatch = useDispatch();
  const { clients, clientsLimit, activeClient, filter, filteredList, isLoadingLabelsClient, isLoadingClients, allClientsLoaded } = useSelector(state => state.client);
  const { idClient } = useParams();


  //Activar cliente
  const setActiveClient = (clientsData) => {
    dispatch(onSetActiveClient(clientsData))
  }

  // Nuevo cliente 
  const startSavingClient = async (clientSave, isEditMode) => {
    try {
      if (isEditMode) {
        const { data } = await clientsApi.put(`/clients/${clientSave.idClient}`, clientSave);
        dispatch(onUpdateClient(data));
        return;
      }

      const { data } = await clientsApi.post('/clients', clientSave);
      dispatch(onAddNewClient(data));

    } catch (error) {
      console.error('Error al guardar cliente', error);
      shallowEqual.dire('Error al guardar', error.response?.data?.msg || 'Error desconocido', 'error');
    }
  }


  //Lectura de clientes
  const starLoadingClients = async () => {

    try {
      //const {data} = await axios.get('http://localhost:4001/api/clients');
      const { data } = await clientsApi.get('clients');
      const client = data.clients;

      dispatch(onLoadClients(client));
      //console.log({client});

    } catch (error) {
      console.log('Error al cargar los eventos');
      console.log(error);
    }
  }

  //Lectura de 30 clientes
  const starLoadingLimitClients = async () => {

    try {
      //const {data} = await axios.get('http://localhost:4001/api/clients');
      const { data } = await clientsApi.get('clients/limit');
      const client = data.clients;

      dispatch(onLoadLimitClients(client));
      //console.log({client});

    } catch (error) {
      console.log('Error al cargar los eventos');
      console.log(error);
    }
  }

  //Lectura de cliente
  const starLoadingClientByID = async () => {
    try {
      const { data } = await clientsApi.get(`clients/${idClient}`);
      const client = data.client;
      dispatch(onLoadClientByID(client));
      // dispatch(onSetActiveClient(client));

    } catch (error) {
      console.error('Error al cargar el cliente:', error);
    }
  }

  //Filtrar 
  // Filtrar clientes en frontend
  //const startFilteringClients = (searchTerm) => (dispatch) => {
  //  dispatch(onSetFilter(searchTerm));
  //};

  // Filtrar clientes (se asegura de tener todos)
  const startFilteringClients = (searchTerm) => async (dispatch, getState) => {
    const { client } = getState();

    if (!client.allClientsLoaded) {
      try {
        const { data } = await clientsApi.get('clients');
        dispatch(onLoadClients(data.clients));
      } catch (error) {
        console.error('Error al cargar todos los clientes', error);
      }
    }

    dispatch(onSetFilter(searchTerm));
  };


  return {
    //*propiedades
    clients,
    activeClient,
    filter,
    filteredList,
    isLoadingLabelsClient,
    isLoadingClients,
    allClientsLoaded,
    clientsLimit,

    //*Metodos
    //Client
    setActiveClient,
    starLoadingClients,
    starLoadingLimitClients,
    starLoadingClientByID,
    startSavingClient,
    startFilteringClients,

    //Label
  }

}
