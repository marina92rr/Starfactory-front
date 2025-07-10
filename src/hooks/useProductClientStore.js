import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { normalizeAllTextFields } from "../helpers/normalizeText";
import { onAddNewProductClient, onDeleteProductClient, onLoadProductClient, onSetActiveProductClient, onUpdateProductClient } from "../store/sales/productClientSlice";



export const useProductClientStore = () => {

    const dispatch = useDispatch();
    const { productClients, activeProductClient } = useSelector(state => state.productClient);

    //Producto activo
    const setActiveProductClient = (productclientData) => {
        dispatch(onSetActiveProductClient(productclientData))
    }


    // Nuevo producto 
    const startSavingProductClient = async (productClientSave, isEditMode) => {
        try {
            const normalizedProductClient = normalizeAllTextFields(productClientSave); //  normalizar todos los campos string
            if (isEditMode) {
                const { data } = await clientsApi.put(`/productclient/${productClientSave.idClient}`, normalizedProductClient);
                dispatch(onUpdateProductClient(data));
                return;
            }

            const { data } = await clientsApi.post('/productclient', normalizedProductClient);
            dispatch(onAddNewProductClient(data));
        } catch (error) {
            console.log(error);
        }
    }

    //Eliminar productClient
    const startDeleteProductClient = async (productClient) => {
         try {
            await clientsApi.delete(`/productClient/${productClient.idProductClient}`);
            dispatch(onDeleteProductClient());
            
        } catch (error) {
            console.error('Error al eliminar el producto del cliente:', error);
        }
    }


    //Lectura de productos por cliente
    const startLoadingProductsByClient = async (idClient) => {
        try {
            const { data } = await clientsApi.get(`/productClient/${idClient}`);
            dispatch(onLoadProductClient(data.productClients));
        } catch (error) {
            console.error('Error cargando productos por categoría:', error);
        }
    };
    //Lectura de productos
    const starLoadingProductsclient = async () => {

        try {
            //const {data} = await axios.get('http://localhost:4001/api/store');
            const { data } = await clientsApi.get('/productClient');
            const productsclient = data.productClients;

            dispatch(onLoadProductClient(productsclient));

        } catch (error) {
            console.log('Error al cargar los eventos');
            console.log(error);
        }
    };

    return {
        //*Propiedades
       productClients,
       activeProductClient,
        //*Metodos
       startSavingProductClient,
       starLoadingProductsclient,
       setActiveProductClient,
       startLoadingProductsByClient,
       startDeleteProductClient
    }

}