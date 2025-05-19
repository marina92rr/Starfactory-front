import { useDispatch, useSelector } from "react-redux"
import { onAddNewClient, onLoadClients, onSetActiveClient, onUpdateClient } from "../store/clients/clientSlice";
import { clientsApi } from "../api";



export const useClientsStore = () => {
  
    const dispatch = useDispatch();
    const {clients, activeClient} = useSelector( state => state.client);


    const setActiveClient = (clientsData) => {
        dispatch(onSetActiveClient(clientsData))
    }

    // Nuevo/actualizar cliente 
    const startSavingClient = async(clientSave) =>{

        try {
        
            const {data} = await clientsApi.post('/clients', clientSave);
            dispatch( onAddNewClient({...clientSave, id: data.client.id}));

        } catch (error) {
            console.log(error);
            shallowEqual.dire('Error al guardar', error.response.data.msg, 'error');
        }
    }




    //Lectura de clientes
    const starLoadingClients = async() =>{

        try {
            //const {data} = await axios.get('http://localhost:4001/api/clients');
            const {data} = await clientsApi.get('/clients');
            const client = data.clients;

            dispatch(onLoadClients(client));
            //console.log({client});
            
        } catch (error) {
            console.log('Error al cargar los eventos');
            console.log(error);
        }
    }

    return{
        //*propiedades
        clients,
        activeClient,

        //*Metodos
        setActiveClient,
        starLoadingClients,
        startSavingClient
    }
    
}
