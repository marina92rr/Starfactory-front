import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onLoadSuscriptionClient, onStartLoadingSuscriptions } from '../store/sales/suscriptionClientSlice';

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

  
  return {
    //* Propiedades
    suscriptionClients,
    activeSuscriptionClient,
    isLoadingSuscription,

    //* Métodos
    startLoadingSuscriptionsByClient,
  };

 
}
