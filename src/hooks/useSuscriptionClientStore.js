import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onDeleteSuscriptionClient, onLoadSuscriptionClient, onStartLoadingSuscriptions } from '../store/sales/suscriptionClientSlice';

export const useSuscriptionClientStore = () => {

    const dispatch = useDispatch();
    const { suscriptionClients, activeSuscriptionClient, isLoadingSuscription } = useSelector(state => state.suscriptionClient);


   
   const startLoadingSuscriptionsByClient = async (idClient) => {
    dispatch(onStartLoadingSuscriptions());

    try {
      const { data } = await clientsApi.get(`/suscriptions/${idClient}`);
      dispatch(onLoadSuscriptionClient(data.suscriptions));
    } catch (error) {
      console.error('Error al cargar suscripciones', error);
      dispatch(onLoadSuscriptionClient([])); // fallback vacío si falla
    }
  };

 const starDeleteSuscription = async (idSuscriptionClient) => {
     try {
      await clientsApi.delete(`/suscriptions/${idSuscriptionClient}`);
      if (activeClient?.idClient) {
        await startLoadingSuscriptionsByClient(activeClient.idClient);
      }
    } catch (error) {
      console.error('Error al eliminar suscripción', error);
      if (activeClient?.idClient) {
        await startLoadingSuscriptionsByClient(activeClient.idClient);
      }
      throw error;
    }
  };

  
  return {
    //* Propiedades
    suscriptionClients,
    activeSuscriptionClient,
    isLoadingSuscription,

    //* Métodos
    startLoadingSuscriptionsByClient,
    starDeleteSuscription
  };

 
}
