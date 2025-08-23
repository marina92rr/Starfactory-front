import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { normalizeAllTextFields } from "../helpers/normalizeText";
import { onAddNewProductClient, onDeleteProductClient, onLoadProductsClient, onLoadProductsClientPaid, onLoadProductsClientUnpaid, onSetActiveProductClient, onUpdateProductClient } from "../store/sales/productClientSlice";
import { useClientsStore } from "./useClientsStore";



export const useProductClientStore = () => {

    const dispatch = useDispatch();
    const { productClients,productsClientPaid, productsClientUnpaid,  activeProductClient } = useSelector(state => state.productClient);

    //Producto activo
    const setActiveProductClient = (productclientData) => {
        dispatch(onSetActiveProductClient(productclientData))
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

       //Lectura de productos no pagados por cliente
    const startLoadingProductsClientPaid = async (idClient) => {
        try {
            const { data } = await clientsApi.get(`/productclient/paid/${idClient}`);
            dispatch(onLoadProductsClientPaid(data.productsClientPaid)); // ¡Ojo! Asegúrate del nombre exacto del action
        
          } catch (error) {
            console.error('❌ Error cargando productos del cliente:', error);
          }
    };

    //Lectura de productos no pagados por cliente
    const startLoadingProductsClientUnpaid = async (idClient) => {
        try {
            const { data } = await clientsApi.get(`/productclient/unpaid/${idClient}`);
            dispatch(onLoadProductsClientUnpaid(data.productsClientUnpaid)); // ¡Ojo! Asegúrate del nombre exacto del action
        
          } catch (error) {
            console.error('❌ Error cargando productos del cliente:', error);
          }
    };

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

      //Actualizar suscripción
    const startUpdateProductClient = async (unpaid) => {
      try {
        const p = normalizeAllTextFields(unpaid);
        const { data } = await clientsApi.put(`/productclient/unpaid/${p.idProductClient}`, p);
        const updated = data?.suscription ?? data ?? p;
        dispatch(onUpdateSuscriptionClient(updated));
        return updated;
      } catch (e) {
        console.error('Error actualizando suscripción:', e);
        throw e;
      }
    };

    // Eliminar productClient
const startDeleteProductClient = async (unpaid) => {
  try {

    await clientsApi.delete(`/productclient/unpaid/${unpaid.idProductClient}`);
    dispatch(onDeleteProductClient(unpaid));
  } catch (error) {
    console.error('Error al eliminar venta impagada:', error);
    throw error;
  }
};


    
    

    return {
        //*Propiedades
       productClients,
       productsClientPaid,
       productsClientUnpaid,
       activeProductClient,
        //*Metodos
       startSavingProductClient,
       setActiveProductClient,
       startLoadingProductsByClient,
       startLoadingProductsClientPaid,
       startLoadingProductsClientUnpaid,
       startUpdateProductClient,
       startDeleteProductClient
    }

}