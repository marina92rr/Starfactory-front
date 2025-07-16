import { useDispatch, useSelector } from "react-redux"
import {
  onAddNewClient,
  onLoadClientByID,
  onLoadClients,
  onLoadLimitClients,
  onLoadScheduledCancellations,
  onSetActiveClient,
  onSetFilter,
  onToggleClientStatusCancel,
  onUpdateClient,
} from "../store/clients/clientSlice";

import { clientsApi } from "../api";
import { useParams } from "react-router-dom";
import { normalizeAllTextFields } from "../helpers/normalizeText";



export const useClientsStore = () => {

  const dispatch = useDispatch();
  const { clients, clientsLimit, activeClient, filter, filteredList, isLoadingLabelsClient, isLoadingClients, allClientsLoaded,scheduledCancellationClients } = useSelector(state => state.client);
  const { idClient } = useParams();


  //Activar cliente
  const setActiveClient = (clientsData) => {
    dispatch(onSetActiveClient(clientsData))
  }

  // Nuevo cliente 
  const startSavingClient = async (clientSave, isEditMode) => {
    try {
       const normalizedClient = normalizeAllTextFields(clientSave); //  normalizar todos los campos string
      if (isEditMode) {
        const { data } = await clientsApi.put(`/clients/${clientSave.idClient}`, normalizedClient);
        dispatch(onUpdateClient(data));
        return;
      }

      const { data } = await clientsApi.post('/clients', normalizedClient);
      dispatch(onAddNewClient(data));

    } catch (error) {
      console.error('Error al guardar cliente', error);
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

  //-------Baja------------
  //Obtener clientes con baja programada
  const loadClientsWithScheduledCancellation = async () => {
  try {
    const { data } = await clientsApi.get('clients/cancel');
    console.log('loadClientsWithScheduledCancellation:', data.clients);
    dispatch(onLoadScheduledCancellations(data.clients));
  } catch (error) {
    console.error('Error al obtener clientes con baja programada:', error);
  }
};

  //Dar baja cliente
  const toggleClientStatusCancel = async (idClient) => {
    try {
      const { data } = await clientsApi.patch(`clients/cancel/${idClient}`);
      console.log('onToggleClientStatusCancel:', onToggleClientStatusCancel);

      dispatch(onToggleClientStatusCancel(data.client)); // recuerda: el backend devuelve `{ msg, client }`
    } catch (error) {
      console.error('Error al cambiar estado de baja del cliente:', error);
    }
  };
  //Programar baja
 const programClientCancellation = async (idClient, cancelDate) => {
  try{
    const { data } = await clientsApi.patch(`/clients/programcancel/${idClient}`, { cancelDate });
    dispatch(onToggleClientStatusCancel(data.client)); // O solo data si no devuelves { client: ... }
  } catch (error) {
    console.error('Error al programar baja del cliente:', error);
  }
};

const cancelClientScheduledCancellation = async (idClient) => {
  try {
    const { data } = await clientsApi.patch(`clients/cancelScheduled/${idClient}`);
    dispatch(onToggleClientStatusCancel(data.client));
  } catch (error) {
    console.error('Error al cancelar la baja programada:', error);
  }
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
    scheduledCancellationClients,

    //*Metodos
    //Client
    setActiveClient,
    starLoadingClients,
    starLoadingLimitClients,
    starLoadingClientByID,
    startSavingClient,
    startFilteringClients,
    toggleClientStatusCancel,
    programClientCancellation,
    cancelClientScheduledCancellation,
    loadClientsWithScheduledCancellation

    //Label
  }

}
