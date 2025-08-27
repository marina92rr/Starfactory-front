import { useDispatch, useSelector } from "react-redux"
import {
  onAddNewClient,
  onLoadClientByID,
  onLoadClients,
  onLoadFilteredLabels,
  onLoadLabelsOfActiveClient,
  setFilteredClientsByLabel,
  clearFilteredClientsByLabel,
  onLoadLimitPageClients,
  onLoadScheduledCancellations,
  onSetActiveClient,
  onSetFilter,
  onToggleClientStatusCancel,
  onUpdateClient,
  onResetClientsPage,
  clearActiveClient,
  onDeleteClient,
  onLoadClientsName
} from "../store/clients/clientSlice";


import { clientsApi } from "../api";
import { useParams } from "react-router-dom";
import { normalizeAllTextFields } from "../helpers/normalizeText";

export const useClientsStore = () => {

  const dispatch = useDispatch();
  const { clients, clientsLimit, activeClient, filter, filteredList,totalPages, isLoadingLabelsClient,filteredClientsByLabel, isLoadingClients, allClientsLoaded, activeClientLabels, scheduledCancellationClients, filteredLabels, clientsName } = useSelector(state => state.client);
  const { idClient } = useParams();
  const filteredLabelsByClient = useSelector(state => state.client.filteredLabelsByClient);



  //Activar cliente
  const setActiveClient = (clientsData) => {
    dispatch(onSetActiveClient(clientsData))
  }

  const startClearingActiveClient = () => {
    dispatch(clearActiveClient());
  };

  const startResetClientsPage = () => {
    dispatch(onResetClientsPage());
  };


  // Nuevo cliente 
  const startSavingClient = async (clientSave, isEditMode) => {
    try {
      const normalizedClient = normalizeAllTextFields(clientSave); //  normalizar todos los campos string
      if (isEditMode) {
        const { data } = await clientsApi.put(`/clients/${clientSave.idClient}`, normalizedClient);
        dispatch(onUpdateClient(data));
       
      } else {
        const { data } = await clientsApi.post('/clients', normalizedClient);
        dispatch(onAddNewClient(data));
      } 
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
 const starLoadingLimitPageClients = async (page = 1) => {
  try {
    const { data } = await clientsApi.get(`clients/limit?page=${page}`);
    const clients = data.clients;
    const totalPages = data.totalPages;

    dispatch(onLoadLimitPageClients({ clients, totalPages }));

  } catch (error) {
    console.log('Error al cargar los clientes');
    console.log(error);
  }
};

  //Lectura de cliente
  const getClientbyClientID = async (idClient) => {
    try {
      const { data } = await clientsApi.get(`clients/${idClient}`);
      const client = data.client;
      dispatch(onLoadClientsName(client));

    } catch (error) {
      console.error('Error al cargar el cliente:', error);
    }
  }

  //Lectura de cliente
  const starLoadingClientByID = async () => {
    try {
      const { data } = await clientsApi.get(`clients/${idClient}`);
      const client = data.client;
      dispatch(onLoadClientByID(client));

      // ¡NO USAR dispatch aquí! Solo llamas a la función:
      await startLoadingLabelsOfClient(client.idClient);
      // dispatch(onSetActiveClient(client));

    } catch (error) {
      console.error('Error al cargar el cliente:', error);
    }
  }


  // Filtrar clientes Buscar...
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

  //-------Etiquetas------------
  // Cargar etiquetas de cliente
  const startLoadingLabelsOfClient = async (idClient) => {
    try {
      const { data } = await clientsApi.get(`clients/${idClient}/labels`);

      dispatch(onLoadLabelsOfActiveClient(data));
    } catch (error) {
      console.error('Error cargando labels del cliente', error);
    }
  }

  const startLoadingFilteredLabels = async (idClient) => {
    try {
      const { data } = await clientsApi.get(`/clients/${idClient}/arraylabels`);
      dispatch(onLoadFilteredLabels({ idClient, labels: data.labels || [] }));
    } catch (err) {
      console.error('Error al cargar filtered labels:', err);
      dispatch(onLoadFilteredLabels({ idClient, labels: [] }));
    }
  };

   const  startDeleteClient = async()=>{
              const {data} = await clientsApi.delete(`/clients/${activeClient.idClient}`);
              dispatch(onDeleteClient(data));
    }

  // Filtrar clientes por etiquetas
  const filterClientsByLabels = async (labelIds) => {
    try {
      // labelIds es un array de Number
      const { data } = await clientsApi.post('/clients/filterlabels', { labelIds });
       console.log('Recibidos', data.length, 'clientes filtrados');
      dispatch(setFilteredClientsByLabel(data)); // guardas el resultado en Redux
    } catch (error) {
      // Maneja el error a tu manera
      console.error(error);
      dispatch(setFilteredClientsByLabel([]));
    }
  };
   const clearFilter = () => {
    dispatch(clearFilteredClientsByLabel());
  };




  //-------Baja------------
  //Obtener clientes con baja programada
  const loadClientsWithScheduledCancellation = async () => {
    try {
      const { data } = await clientsApi.get(`clients/cancelScheduled`);
      dispatch(onLoadScheduledCancellations(data.clients));
    } catch (error) {
      console.error('Error al obtener clientes con baja programada:', error);
    }
  };

  //Dar baja cliente
  const toggleClientStatusCancel = async (idClient, removeSales = false) => {
    try {
      const { data } = await clientsApi.patch(`clients/cancel/${idClient}`,  {removeSales});
      dispatch(onToggleClientStatusCancel(data.client)); // recuerda: el backend devuelve `{ msg, client }`
    } catch (error) {
      console.error('Error al cambiar estado de baja del cliente:', error);
    }
  };
  //Programar baja
  const programClientCancellation = async (idClient, cancelDate, removeSales = false) => {
    try {
      const { data } = await clientsApi.patch(`/clients/programcancel/${idClient}`, { cancelDate }, {removeSales});
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
    startClearingActiveClient,
    filter,
    filteredList,
    isLoadingLabelsClient,
    isLoadingClients,
    allClientsLoaded,
    clientsLimit,
    scheduledCancellationClients,
    activeClientLabels,
    filteredLabels,
    filteredLabelsByClient,
    filteredClientsByLabel,
    totalPages,
    clientsName,

    //*Metodos
    //Client
    setActiveClient,
    startResetClientsPage,
    starLoadingClients,
    starLoadingLimitPageClients,
    getClientbyClientID,
    starLoadingClientByID,
    startSavingClient,
    startDeleteClient,
    startFilteringClients,
    toggleClientStatusCancel,
    programClientCancellation,
    cancelClientScheduledCancellation,
    loadClientsWithScheduledCancellation,
    startLoadingLabelsOfClient,
    startLoadingFilteredLabels,
    

    //Label
    filterClientsByLabels,
    clearFilter
  }

}
