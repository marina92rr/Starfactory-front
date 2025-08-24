import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { normalizeAllTextFields } from "../helpers/normalizeText";
import { onAddNewProductClient, onDeleteProductClient, onLoadAllProductsClient, onLoadProductsByDate, onLoadProductsClient, onLoadProductsClientPaid, onLoadProductsClientUnpaid, onSetActiveProductClient, onSetSelectedDate, onUpdateProductClient } from "../store/sales/productClientSlice";
import { useClientsStore } from "./useClientsStore";



export const useProductClientStore = () => {

  const dispatch = useDispatch();
  const { productClients, productsClientPaid, productsClientUnpaid, activeProductClient, selectedDate, productsClientDate } = useSelector(state => state.productClient);

  //Producto activo
  const setActiveProductClient = (productclientData) => {
    dispatch(onSetActiveProductClient(productclientData))
  }

  //Lectura de productos por fecha
  const getAllProductsClientByDate = async (date) => {
    try {
      const { data } = await clientsApi.get(`/productclient/date/${date}`);
      dispatch(onLoadAllProductsClient(data.productsClient)); // ¡Ojo! Asegúrate del nombre exacto del action

    } catch (error) {
      console.error('❌ Error cargando productos por fecha:', error);
    }
  };


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

      if (Array.isArray(data)) {
        data.forEach((item) => dispatch(onAddNewProductClient(item)));
      } else {
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
      dispatch(onUpdateProductClient(updated));
      return updated;
    } catch (e) {
      console.error('Error actualizando suscripción:', e);
      throw e;
    }
  };

  //Obtener producto por fecha CONTABILIDAD
  const setSelectedDate = (date) => {
    dispatch(onSetSelectedDate(date)); // 'YYYY-MM-DD'
  };

  const startLoadProductsByDate = async (date) => {
    try {
      // Normaliza a 'YYYY-MM-DD'
      const normalizedDate =
        date?.length === 10 ? date : new Date(date).toISOString().slice(0, 10);

      const { data } = await clientsApi.get(`/productClient/date/${normalizedDate}`);
      dispatch(onLoadProductsByDate(data.productsClient || []));

    } catch (e) {
      console.error('Error cargando productos por fecha', e);
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
    productsClientDate,
    selectedDate,
    //*Metodos
    startSavingProductClient,
    setActiveProductClient,
    getAllProductsClientByDate,
    startLoadingProductsByClient,
    startLoadingProductsClientPaid,
    startLoadingProductsClientUnpaid,
    startUpdateProductClient,
    startDeleteProductClient,
    startLoadProductsByDate,
    setSelectedDate,
  }

}