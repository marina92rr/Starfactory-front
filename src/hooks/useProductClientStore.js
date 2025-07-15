import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { normalizeAllTextFields } from "../helpers/normalizeText";
import { onAddNewProductClient, onDeleteProductClient, onLoadProductsClient, onSetActiveProductClient, onUpdateProductClient } from "../store/sales/productClientSlice";
import { useClientsStore } from "./useClientsStore";



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
            
            if(Array.isArray(data)){
                data.forEach((item) => dispatch(onAddNewProductClient(item)));
            }else{
                dispatch(onAddNewProductClient(data));
            }
        } catch (error) {
            console.log('Error en Front', error);
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
            const { data } = await clientsApi.get(`/productclient/${idClient}`);
            dispatch(onLoadProductsClient(data.productsClient)); // ¡Ojo! Asegúrate del nombre exacto del action
        
          } catch (error) {
            console.error('❌ Error cargando productos del cliente:', error);
          }
    };
    

    return {
        //*Propiedades
       productClients,
       activeProductClient,
        //*Metodos
       startSavingProductClient,
       setActiveProductClient,
       startLoadingProductsByClient,
       startDeleteProductClient
    }

}