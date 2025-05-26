import { useDispatch, useSelector } from "react-redux"
import { onAddNewClient, 
         onLoadClientByDNI, 
         onLoadClients, 
         onLoadingLabelsClient, 
         onSetActiveClient, 
         onSetActiveLabel, 
         onSetFilter,
        } from "../store/clients/clientSlice";

import { clientsApi } from "../api";
import { useParams } from "react-router-dom";



export const useClientsStore = () => {
  
    const dispatch = useDispatch();
    const {clients, activeClient, filter, filteredList, isLoadingLabelsClient } = useSelector( state => state.client);
    const {dni}= useParams();


    //Activar cliente
    const setActiveClient = (clientsData) => {
        dispatch(onSetActiveClient(clientsData))
    }

    // Nuevo cliente 
    const startSavingClient = async(clientSave) =>{
        try {
        
            const {data} = await clientsApi.post('/clients', clientSave);
            dispatch( onAddNewClient(data));

        } catch (error) {
            console.log(error);
            shallowEqual.dire('Error al guardar', error.response.data.msg, 'error');
        }
    }


    //Lectura de clientes
    const starLoadingClients = async() =>{

        try {
            //const {data} = await axios.get('http://localhost:4001/api/clients');
            const {data} = await clientsApi.get('clients');
            const client = data.clients;

            dispatch(onLoadClients(client));
            //console.log({client});
            
        } catch (error) {
            console.log('Error al cargar los eventos');
            console.log(error);
        }
    }

    //Lectura de cliente
    const starLoadingClientByDNI = async() =>{
        try {
            const {data} = await clientsApi.get(`/clients/${dni}`);
            const client = data.client;
            dispatch(onLoadClientByDNI(client));
            dispatch(onSetActiveClient(client));
            
        } catch (error) {
            console.error('Error al cargar el cliente:', error);
        }
    }

    //Filtrar 
    // Filtrar clientes en frontend
    const startFilteringClients = (searchTerm) => (dispatch) => {
      dispatch(onSetFilter(searchTerm));
    };

    //LABELS
    const startLoadingLabelsClient = async() =>{

        dispatch(onSetActiveLabel());
        if(!activeClient) return
        try {
                const { data } = await clientsApi.get(`/clients/${activeClient.dni}/labels`);
                dispatch(onLoadingLabelsClient({
                    dni: activeClient.dni,
                    labels: data.labels
                }))

        } catch (error) {
             console.error('Error cargando etiquetas:', error)
        }
    }
   

    
    return{
        //*propiedades
        clients,
        activeClient,
        filter,
        filteredList,
        isLoadingLabelsClient,

        //*Metodos
        //Client
        setActiveClient,
        starLoadingClients,
        starLoadingClientByDNI,
        startSavingClient,
        startFilteringClients,

        //Label
        startLoadingLabelsClient
    }
    
}
